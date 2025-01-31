import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question } from '../types/quiz';

interface QuizCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  isAnswered: boolean;
  selectedAnswer?: number;
}

const QuizCard = ({ question, onAnswer, isAnswered, selectedAnswer }: QuizCardProps) => {
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
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <p>{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;