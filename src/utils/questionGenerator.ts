const CRISC_DOMAINS = [
  {
    name: "Domain 1",
    description: "IT Risk Identification",
    topics: ["Risk identification methods", "Risk assessment frameworks", "Asset classification"]
  },
  {
    name: "Domain 2",
    description: "IT Risk Assessment",
    topics: ["Risk analysis techniques", "Impact analysis", "Probability assessment"]
  },
  {
    name: "Domain 3",
    description: "Risk Response and Mitigation",
    topics: ["Control implementation", "Risk treatment options", "Mitigation strategies"]
  },
  {
    name: "Domain 4",
    description: "Risk and Control Monitoring and Reporting",
    topics: ["KRI monitoring", "Control effectiveness", "Risk reporting"]
  }
];

const DIFFICULTY_LEVELS = ["Basic", "Intermediate", "Advanced"];

const EXAMPLE_QUESTION = {
  text: "Which risk assessment approach is MOST appropriate when evaluating the potential impact of a new cloud service implementation?",
  options: [
    "Quantitative analysis using historical data",
    "Qualitative analysis based on expert judgment",
    "Hybrid approach combining quantitative and qualitative methods",
    "Automated risk scoring without human intervention"
  ],
  correctAnswer: 2,
  explanation: "A hybrid approach combining quantitative and qualitative methods is most appropriate for cloud service implementation risk assessment. This allows for both measurable metrics (costs, downtime estimates) and expert judgment on less tangible factors (reputation impact, compliance implications). This comprehensive approach provides a more complete risk picture than purely quantitative or qualitative methods alone."
};

export const generateQuestionPrompt = (previousQuestions: Question[]) => {
  // Track which domains have been covered
  const domainCounts: Record<string, number> = CRISC_DOMAINS.reduce((acc, domain) => ({
    ...acc,
    [domain.name]: 0
  }), {});

  previousQuestions.forEach(q => {
    if (q.domain) {
      domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
    }
  });

  // Find least covered domain
  const leastCoveredDomain = Object.entries(domainCounts)
    .sort(([,a], [,b]) => (a as number) - (b as number))[0][0];

  const domain = CRISC_DOMAINS.find(d => d.name === leastCoveredDomain);
  const difficulty = DIFFICULTY_LEVELS[Math.floor(Math.random() * DIFFICULTY_LEVELS.length)];

  return `Generate a ${difficulty} level CRISC (Certified in Risk and Information Systems Control) practice question for ${domain.name}: ${domain.description}.

Focus on these topics: ${domain.topics.join(', ')}.

Requirements:
- Question should be scenario-based
- Include 4 plausible options
- Provide a detailed explanation (100-150 words) that references CRISC best practices
- Explanation should clarify why the correct answer is best and why others are insufficient

Example format:
${JSON.stringify(EXAMPLE_QUESTION, null, 2)}

Return ONLY valid JSON in exactly this format:
{
  "id": number,
  "text": string,
  "options": string[],
  "correctAnswer": number (0-3),
  "explanation": string,
  "domain": string,
  "difficulty": string
}`;
};
