export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;  // Added this field
  domain?: string;
  difficulty?: string;
}