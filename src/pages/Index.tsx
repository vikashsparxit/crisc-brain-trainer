import React, { useState } from 'react';
import { questions } from '../data/questions';
import QuizCard from '../components/QuizCard';
import Progress from '../components/Progress';
import Summary from '../components/Summary';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const { toast } = useToast();

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

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setSelectedAnswer(undefined);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setIsAnswered(false);
    setSelectedAnswer(undefined);
  };

  if (currentQuestionIndex >= questions.length) {
    return <Summary score={score} totalQuestions={questions.length} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">CRISC Practice Quiz</h1>
      <Progress
        current={currentQuestionIndex}
        total={questions.length}
        score={score}
      />
      <QuizCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        isAnswered={isAnswered}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
};

export default Index;