<lov-code>
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
import { ArrowLeft, ArrowRight, Bot, Confetti } from "lucide-react";

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
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedQuestions = await getQuestions();
        const savedProgress = await getProgress();
        
        if (savedQuestions?.length > 0) {
          setQuestions([...initialQuestions, ...savedQuestions]);
        } else {
          generateInitialQuestions();
        }
        
        if (savedProgress) {
          setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
          setScore(savedProgress.score);
          setAnswers(savedProgress.answers);
          setStreak(savedProgress.streak || 0);
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
        await saveProgress