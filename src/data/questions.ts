import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    text: "Which of the following BEST describes the purpose of risk identification in IT risk management?",
    options: [
      "To eliminate all possible risks in IT systems",
      "To create a comprehensive list of potential risks that could affect objectives",
      "To implement controls for known vulnerabilities",
      "To calculate the financial impact of risks"
    ],
    correctAnswer: 1,
    explanation: "Risk identification aims to create a comprehensive list of potential risks that could affect objectives. It's not about eliminating all risks (which is impossible) or implementing controls (which comes later in the process)."
  },
  {
    id: 2,
    text: "What is the PRIMARY objective of IT risk governance?",
    options: [
      "To maximize IT investments",
      "To eliminate all IT risks",
      "To align IT risk management with business objectives",
      "To implement security controls"
    ],
    correctAnswer: 2,
    explanation: "IT risk governance primarily aims to align IT risk management with business objectives, ensuring that risk management strategies support overall business goals."
  },
  {
    id: 3,
    text: "Which component is MOST important when establishing risk appetite?",
    options: [
      "Technical capabilities",
      "Business objectives",
      "Budget constraints",
      "Industry standards"
    ],
    correctAnswer: 1,
    explanation: "Business objectives are the most important component when establishing risk appetite, as they determine what level of risk is acceptable in pursuit of organizational goals."
  }
];