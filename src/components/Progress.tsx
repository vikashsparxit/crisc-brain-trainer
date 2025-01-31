import React from 'react';
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Heart } from "lucide-react";

interface ProgressProps {
  current: number;
  total: number;
  score: number;
  streak?: number;
}

const Progress = ({ current, total, score }: ProgressProps) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium flex items-center gap-1">
          Score: {score}/{current} <Heart className="h-4 w-4 fill-red-500 stroke-red-500" />
        </span>
      </div>
      <ProgressBar value={percentage} className="h-2" />
    </div>
  );
};

export default Progress;