import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SummaryProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Summary = ({ score, totalQuestions, onRestart }: SummaryProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-4xl font-bold text-primary">{percentage}%</p>
          <p className="text-muted-foreground">
            You scored {score} out of {totalQuestions} questions correctly
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={onRestart} className="w-full max-w-xs">
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;