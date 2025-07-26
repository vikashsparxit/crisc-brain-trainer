import React from 'react';
import { Heart, Trophy, Sparkles, SmilePlus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MotivationalMessageProps {
  isCorrect: boolean;
  streak: number;
  className?: string;
  userName?: string;
}

const MotivationalMessage = ({ isCorrect, streak, className, userName = "Friend" }: MotivationalMessageProps) => {
  const messages = {
    correct: [
      `Amazing job, ${userName}! 🌟`,
      `You're brilliant, ${userName}! Keep shining! ✨`,
      `That's the way, ${userName}! You've got this! 💫`,
      "Fantastic work, my love! 💖",
      `You make learning look easy, ${userName}! 🎯`
    ],
    incorrect: [
      `Don't worry, ${userName}! Every attempt makes you stronger! 💪`,
      "Keep going, my love! You're learning! 💝",
      `You've got this, ${userName}! Next one will be yours! 🌟`,
      "Remember, each question makes you better prepared! 💫",
      `Stay confident, ${userName}! You're doing great! 💖`
    ],
    streak: [
      `Incredible streak, ${userName}! 🔥`,
      "You're on fire! Keep it up! ⭐",
      `Unstoppable ${userName}! Amazing work! 🌟`,
      "What a winning streak! You're amazing! 💫",
      "Look at you go! Fantastic progress! 💖"
    ]
  };

  const getRandomMessage = (type: 'correct' | 'incorrect' | 'streak') => {
    const messageArray = messages[type];
    return messageArray[Math.floor(Math.random() * messageArray.length)];
  };

  const getMessage = () => {
    if (streak >= 3) {
      return (
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500 animate-bounce" />
          {getRandomMessage('streak')}
          <Sparkles className="text-yellow-500 animate-pulse" />
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2">
        {isCorrect ? (
          <>
            <SmilePlus className="text-green-500" />
            {getRandomMessage('correct')}
            <Heart className="text-red-500 animate-pulse" />
          </>
        ) : (
          <>
            <Heart className="text-red-500" />
            {getRandomMessage('incorrect')}
            <Sparkles className="text-blue-500" />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={cn("text-lg font-medium text-center p-4 rounded-lg bg-opacity-10", 
      isCorrect ? "bg-green-100" : "bg-blue-100",
      className
    )}>
      {getMessage()}
    </div>
  );
};

export default MotivationalMessage;