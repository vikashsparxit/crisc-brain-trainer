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
  },
  {
    id: 4,
    text: "What is the MOST effective way to monitor IT risk indicators?",
    options: [
      "Annual risk assessments",
      "Real-time monitoring dashboards with KRIs",
      "Monthly security reports",
      "Quarterly compliance reviews"
    ],
    correctAnswer: 1,
    explanation: "Real-time monitoring dashboards with Key Risk Indicators (KRIs) provide the most effective way to monitor IT risks as they allow for immediate detection of risk threshold breaches and enable prompt response to emerging threats."
  },
  {
    id: 5,
    text: "Which approach is BEST for determining the value of information assets?",
    options: [
      "Purchase cost of the asset",
      "Replacement cost",
      "Business impact analysis",
      "Insurance valuation"
    ],
    correctAnswer: 2,
    explanation: "Business impact analysis is the best approach for determining information asset value as it considers both tangible and intangible impacts on business operations, including potential revenue loss, regulatory implications, and reputational damage."
  },
  {
    id: 6,
    text: "What is the PRIMARY benefit of conducting regular IT risk assessments?",
    options: [
      "To ensure compliance with regulations",
      "To identify and mitigate potential risks proactively",
      "To reduce IT costs",
      "To improve employee productivity"
    ],
    correctAnswer: 1,
    explanation: "Regular IT risk assessments help organizations identify and mitigate potential risks proactively, ensuring that they can address vulnerabilities before they lead to significant issues."
  },
  {
    id: 7,
    text: "Which of the following is a key component of a risk management framework?",
    options: [
      "Risk avoidance",
      "Risk acceptance",
      "Risk transfer",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "A comprehensive risk management framework includes risk avoidance, acceptance, and transfer strategies to effectively manage and mitigate risks."
  },
  {
    id: 8,
    text: "What is the role of Key Risk Indicators (KRIs) in risk management?",
    options: [
      "To measure the effectiveness of risk controls",
      "To identify potential risks before they occur",
      "To provide a historical analysis of risk events",
      "To ensure compliance with legal requirements"
    ],
    correctAnswer: 1,
    explanation: "Key Risk Indicators (KRIs) are metrics used to measure the effectiveness of risk controls and help organizations monitor their risk exposure."
  },
  {
    id: 9,
    text: "Which of the following is NOT a common method for risk assessment?",
    options: [
      "Qualitative analysis",
      "Quantitative analysis",
      "Historical analysis",
      "Random sampling"
    ],
    correctAnswer: 3,
    explanation: "Random sampling is not a common method for risk assessment; instead, qualitative and quantitative analyses are typically used to evaluate risks."
  },
  {
    id: 10,
    text: "What is the main purpose of a risk treatment plan?",
    options: [
      "To document all identified risks",
      "To outline strategies for managing identified risks",
      "To ensure compliance with regulations",
      "To provide training to employees"
    ],
    correctAnswer: 2,
    explanation: "A risk treatment plan outlines strategies for managing identified risks, including risk avoidance, mitigation, transfer, and acceptance."
  },
  {
    id: 11,
    text: "Which of the following is a common challenge in IT risk management?",
    options: [
      "Lack of stakeholder engagement",
      "Overabundance of data",
      "Rapidly changing technology landscape",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The rapidly changing technology landscape presents a common challenge in IT risk management, as organizations must continuously adapt their strategies to address new risks."
  },
  {
    id: 12,
    text: "What is the purpose of a risk appetite statement?",
    options: [
      "To define the maximum level of risk an organization is willing to accept",
      "To outline the process for risk assessment",
      "To document all identified risks",
      "To provide training to employees"
    ],
    correctAnswer: 0,
    explanation: "A risk appetite statement defines the maximum level of risk an organization is willing to accept in pursuit of its objectives."
  },
  {
    id: 13,
    text: "Which of the following is a benefit of using a risk management software tool?",
    options: [
      "Increased manual effort",
      "Improved data accuracy and reporting",
      "Higher costs",
      "Reduced stakeholder engagement"
    ],
    correctAnswer: 1,
    explanation: "Using a risk management software tool can improve data accuracy and reporting, making it easier for organizations to manage and analyze risks."
  },
  {
    id: 14,
    text: "What is the primary goal of incident response planning?",
    options: [
      "To prevent all incidents from occurring",
      "To minimize the impact of incidents when they occur",
      "To ensure compliance with regulations",
      "To provide training to employees"
    ],
    correctAnswer: 1,
    explanation: "The primary goal of incident response planning is to minimize the impact of incidents when they occur, ensuring a swift and effective response."
  },
  {
    id: 15,
    text: "Which of the following is a key principle of effective risk communication?",
    options: [
      "Transparency",
      "Confidentiality",
      "Complexity",
      "Ambiguity"
    ],
    correctAnswer: 0,
    explanation: "Transparency is a key principle of effective risk communication, as it helps build trust and ensures that stakeholders are informed about risks."
  },
  {
    id: 16,
    text: "What is the purpose of a business continuity plan?",
    options: [
      "To ensure compliance with regulations",
      "To outline procedures for maintaining operations during a disruption",
      "To document all identified risks",
      "To provide training to employees"
    ],
    correctAnswer: 1,
    explanation: "A business continuity plan outlines procedures for maintaining operations during a disruption, ensuring that critical functions can continue."
  },
  {
    id: 17,
    text: "Which of the following is a common method for risk mitigation?",
    options: [
      "Risk avoidance",
      "Risk transfer",
      "Risk acceptance",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Risk mitigation can involve avoidance, transfer, acceptance, or a combination of these strategies to effectively manage risks."
  },
  {
    id: 18,
    text: "What is the role of a risk manager?",
    options: [
      "To eliminate all risks",
      "To identify, assess, and manage risks",
      "To ensure compliance with regulations",
      "To provide training to employees"
    ],
    correctAnswer: 1,
    explanation: "The role of a risk manager is to identify, assess, and manage risks to ensure that the organization can achieve its objectives."
  },
  {
    id: 19,
    text: "Which of the following is a key component of a risk management strategy?",
    options: [
      "Risk identification",
      "Risk assessment",
      "Risk treatment",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "A comprehensive risk management strategy includes risk identification, assessment, and treatment to effectively manage risks."
  },
  {
    id: 20,
    text: "What is the purpose of a risk assessment report?",
    options: [
      "To document all identified risks and their potential impacts",
      "To ensure compliance with regulations",
      "To provide training to employees",
      "To eliminate all risks"
    ],
    correctAnswer: 0,
    explanation: "A risk assessment report documents all identified risks and their potential impacts, providing a basis for risk management decisions."
  }
];
