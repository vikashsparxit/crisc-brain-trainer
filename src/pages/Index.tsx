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

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('deepseek_api_key'));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedQuestions = await getQuestions();
        const savedProgress = await getProgress();
        
        if (savedQuestions?.length > 0) {
          setQuestions([...initialQuestions, ...savedQuestions]);
        } else {
          // Generate initial AI questions if no saved questions exist
          generateInitialQuestions();
        }
        
        if (savedProgress) {
          setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
          setScore(savedProgress.score);
          setAnswers(savedProgress.answers);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    loadSavedData();
  }, []);

  const generateInitialQuestions = async () => {
    setIsLoading(true);
    try {
      const newQuestions = [];
      for (let i = 0; i < 5; i++) {
        const question = await generateNewQuestion();
        if (question) newQuestions.push(question);
      }
      setQuestions([...questions, ...newQuestions]);
      await saveQuestions(newQuestions);
    } catch (error) {
      console.error('Error generating initial questions:', error);
    }
    setIsLoading(false);
  };

  const generateNewQuestion = async () => {
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

      const data = await response.json();
      console.log('AI Response:', data);
      
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: "Failed to generate new question. Please try again.",
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
          answers
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    saveCurrentProgress();
  }, [currentQuestionIndex, score, answers]);

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job! Review the explanation and click 'Next Question' when ready.",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Review the explanation and click 'Next Question' when ready.",
        variant: "destructive",
      });
    }

    // Generate new question if we're near the end
    if (currentQuestionIndex >= questions.length - 2) {
      generateNewQuestion().then(newQuestion => {
        if (newQuestion) {
          setQuestions([...questions, newQuestion]);
          saveQuestions([newQuestion]);
        }
      });
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswered(false);
    setSelectedAnswer(undefined);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswered(true);
    }
  };

  if (!apiKey) {
    return (
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">CRISC Practice Quiz</h1>
        <Settings onApiKeySet={(key) => setApiKey(key)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">CRISC Practice Quiz</h1>
      <Progress
        current={currentQuestionIndex}
        total={answers.length + 1}
        score={score}
      />
      {isLoading ? (
        <div className="text-center p-6">
          <p>Generating questions...</p>
        </div>
      ) : (
        <>
          <QuizCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
            selectedAnswer={selectedAnswer}
          />
          <div className="flex gap-4 mt-6">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              <ArrowLeft className="mr-2" />
              Previous
            </Button>
            {isAnswered && (
              <Button onClick={handleNextQuestion}>
                Next Question
                <Bot className="ml-2" />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;