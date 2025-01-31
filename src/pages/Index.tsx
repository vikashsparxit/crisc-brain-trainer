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

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('deepseek_api_key'));
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [streak, setStreak] = useState(0);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        setIsLoading(true);
        await initDB();
        const savedProgress = await getProgress();
        
        // Select one random question from the initial pool
        const randomIndex = Math.floor(Math.random() * initialQuestions.length);
        const randomInitialQuestion = initialQuestions[randomIndex];
        
        setQuestions([randomInitialQuestion]);
        
        if (savedProgress) {
          setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
          setScore(savedProgress.score);
          setAnswers(savedProgress.answers);
          setStreak(savedProgress.streak || 0);
        }
        
        // Only start generating AI questions if we have an API key
        if (apiKey) {
          await generateInitialQuestions();
        } else {
          toast({
            title: "API Key Required",
            description: "Please set your DeepSeek API key in settings to generate more questions.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        toast({
          title: "Error",
          description: "Failed to load saved data. Starting fresh.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, [apiKey]);

  const generateInitialQuestions = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your DeepSeek API key in settings to generate more questions.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingQuestion(true);
    try {
      const newQuestions = [];
      for (let i = 0; i < 5; i++) {
        const question = await generateNewQuestion();
        if (question) newQuestions.push(question);
      }
      setQuestions(prevQuestions => [...prevQuestions, ...newQuestions]);
      await saveQuestions(newQuestions);
    } catch (error) {
      console.error('Error generating initial questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please check your API key.",
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
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to generate question');
      }

      const data = await response.json();
      console.log('AI Response:', data);
      
      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from API');
      }

      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate new question.",
        variant: "destructive",
      });
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
          title: "Amazing streak, Mehu! 🌟",
          description: `You've got ${streak + 1} correct answers in a row! Keep going! ❤️`,
        });
      }
    } else {
      setStreak(0);
    }
    
    setAnswers([...answers, isCorrect]);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(undefined);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswered(true);
      setSelectedAnswer(undefined);
    }
  };

  if (isLoading || !questions[currentQuestionIndex]) {
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
      <Progress 
        current={currentQuestionIndex} 
        total={questions.length}
        score={score}
        streak={streak}
      />
      
      <QuizCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        isAnswered={isAnswered}
        selectedAnswer={selectedAnswer}
        streak={streak}
      />

      <div className="flex justify-between mt-4 mb-8">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {isAnswered && (
          <Button 
            onClick={handleNextQuestion}
            disabled={isGeneratingQuestion}
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