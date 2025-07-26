import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from '../types/quiz';
import MotivationalMessage from './MotivationalMessage';

interface QuizCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  isAnswered: boolean;
  selectedAnswer?: number;
  streak: number;
  userName?: string;
}

const QuizCard = ({ question, onAnswer, isAnswered, selectedAnswer, streak, userName }: QuizCardProps) => {
  const isCorrect = isAnswered && selectedAnswer === question.correctAnswer;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={isAnswered 
                ? (index === question.correctAnswer 
                  ? "default"
                  : index === selectedAnswer 
                    ? "destructive"
                    : "outline")
                : "outline"}
              className={`w-full justify-start text-left p-4 h-auto ${
                isAnswered && index === question.correctAnswer ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
            >
              {option}
            </Button>
          ))}
        </div>
        {isAnswered && (
          <div className="mt-6 space-y-4">
            <MotivationalMessage 
              isCorrect={isCorrect}
              streak={streak}
              className="mb-4"
              userName={userName}
            />
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <p>{question.explanation}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-semibold mb-2">Source:</h3>
              <p className="text-sm text-slate-600">{question.source}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;