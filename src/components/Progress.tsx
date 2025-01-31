import React from 'react';
import { Progress as ProgressBar } from "@/components/ui/progress";

interface ProgressProps {
  current: number;
  total: number;
  score: number;
}

const Progress = ({ current, total, score }: ProgressProps) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium">
          Score: {score}/{current}
        </span>
      </div>
      <ProgressBar value={percentage} className="h-2" />
    </div>
  );
};

export default Progress;