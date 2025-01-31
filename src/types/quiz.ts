export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  domain?: string;
  difficulty?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  answers: boolean[];
}