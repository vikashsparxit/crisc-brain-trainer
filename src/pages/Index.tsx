import React, { useState, useEffect } from 'react';
import { questions as initialQuestions } from '../data/questions';
import QuizCard from '../components/QuizCard';
import Progress from '../components/Progress';
import Settings from '../components/Settings';
import { useToast } from "@/hooks/use-toast";
import { generateQuestionPrompt } from '../utils/questionGenerator';
import { initDB, saveQuestions, getQuestions, saveProgress, getProgress } from '../utils/indexedDB';
import { Question } from '../types/quiz';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Bot } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const BATCH_SIZE = 7; // Number of questions to generate at once

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('deepseek_api_key'));
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const { toast } = useToast();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadInitialQuestion = async () => {
      try {
        await initDB();
        const savedProgress = await getProgress();
        
        // Select one random question from the initial pool
        const randomIndex = Math.floor(Math.random() * initialQuestions.length);
        const randomInitialQuestion = initialQuestions[randomIndex];
        
        // Immediately set the first question
        setQuestions([randomInitialQuestion]);
        
        if (savedProgress) {
          setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
          setScore(savedProgress.score);
          setAnswers(savedProgress.answers);
          setStreak(savedProgress.streak || 0);
        }
      } catch (error) {
        console.error('Error loading initial question:', error);
        toast({
          title: "Error",
          description: "Failed to load initial question. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    loadInitialQuestion();
  }, []);

  const generateBatchQuestions = async () => {
    if (!apiKey) return;

    setIsGeneratingQuestion(true);
    try {
      const newQuestions = [];
      for (let i = 0; i < BATCH_SIZE; i++) {
        const question = await generateNewQuestion();
        if (question) newQuestions.push(question);
      }
      
      if (newQuestions.length > 0) {
        setQuestions(prevQuestions => [...prevQuestions, ...newQuestions]);
        await saveQuestions(newQuestions);
      } else {
        throw new Error('Failed to generate new questions');
      }
    } catch (error) {
      console.error('Error generating batch questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate new questions. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const generateNewQuestion = async () => {
    if (!apiKey) return null;

    try {
      const prompt = generateQuestionPrompt(questions);
      console.log('Generating question with prompt:', prompt);

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{
            role: "user",
            content: prompt
          }],
          temperature: 0.7,
          max_tokens: 1500,
          top_p: 0.95,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('AI Response:', data);
      
      try {
        const parsedQuestion = JSON.parse(data.choices[0].message.content);
        
        if (!parsedQuestion.source) {
          throw new Error('Question response missing source information');
        }
        
        return parsedQuestion;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        return null;
      }
    } catch (error) {
      console.error('Error generating question:', error);
      return null;
    }
  };

  useEffect(() => {
    const saveCurrentProgress = async () => {
      try {
        await saveProgress({
          currentQuestionIndex,
          score,
          answers,
          streak
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    saveCurrentProgress();
  }, [currentQuestionIndex, score, answers, streak]);

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setIsAnswered(true);
    setSelectedAnswer(answerIndex);
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      if ((streak + 1) % 5 === 0) {
        toast({
          title: "Amazing streak! 🌟",
          description: `You've got ${streak + 1} correct answers in a row! Keep going! ❤️`,
        });
      }
    } else {
      setStreak(0);
    }
    
    setAnswers([...answers, isCorrect]);
  };

  const handleNextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;
    
    // If we're moving to the second question or we're running low on questions ahead,
    // generate a new batch
    if (nextIndex === 1 || (nextIndex >= questions.length - 2 && !isGeneratingQuestion)) {
      await generateBatchQuestions();
    }
    
    setIsAnswered(false);
    setSelectedAnswer(undefined);
    setCurrentQuestionIndex(nextIndex);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswered(true);
      setSelectedAnswer(undefined);
    }
  };

  if (!questions[currentQuestionIndex]) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CRISC Mock Exam</h1>
        <p className="text-gray-600">Test your knowledge with ISACA CRISC certification questions</p>
      </div>
      
      <Progress 
        current={currentQuestionIndex} 
        total={questions.length}
        score={score}
        streak={streak}
      />
      
      <div className="space-y-6">
        <QuizCard
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          streak={streak}
        />

        <div className="flex justify-between items-center max-w-2xl mx-auto mt-4">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="w-32"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {isAnswered && (
            <Button 
              onClick={handleNextQuestion}
              disabled={isGeneratingQuestion}
              className="w-32"
            >
              {isGeneratingQuestion ? (
                <>
                  Generating...
                  <div className="animate-spin ml-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Bot className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Configure your DeepSeek API key for question generation.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <Settings onApiKeySet={setApiKey} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Index;
