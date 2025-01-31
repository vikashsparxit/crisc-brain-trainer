import React, { useState, useEffect } from 'react';
import { questions as initialQuestions } from '../data/questions';
import QuizCard from '../components/QuizCard';
import Progress from '../components/Progress';
import Settings from '../components/Settings';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('deepseek_api_key'));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateNewQuestion = async () => {
    setIsLoading(true);
    try {
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
            content: "Generate a CRISC (Certified in Risk and Information Systems Control) practice question in this exact JSON format: { id: number, text: string, options: string[] with exactly 4 options, correctAnswer: number (0-3), explanation: string }. Make it challenging and ensure the explanation is detailed."
          }]
        })
      });

      const data = await response.json();
      console.log('AI Response:', data);
      
      // Parse the response and extract the question
      const newQuestion = JSON.parse(data.choices[0].message.content);
      setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: "Failed to generate new question. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done! Let's move to the next question.",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Review the explanation and try the next question.",
        variant: "destructive",
      });
    }

    // Generate new question if we're near the end
    if (currentQuestionIndex >= questions.length - 2) {
      generateNewQuestion();
    }

    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedAnswer(undefined);
    }, 2000);
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
          <p>Generating next question...</p>
        </div>
      ) : (
        <QuizCard
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
        />
      )}
    </div>
  );
};

export default Index;