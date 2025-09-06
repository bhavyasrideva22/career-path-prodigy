export interface AssessmentResponse {
  questionId: string;
  answer: number;
  category: string;
  subcategory: string;
  weight: number;
}

export interface ScoreBreakdown {
  psychometric: number;
  technical: number;
  wiscar: number;
  overall: number;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

export interface AssessmentResults {
  scores: ScoreBreakdown;
  wiscarScores: WiscarScores;
  recommendation: 'strong-fit' | 'moderate-fit' | 'poor-fit';
  personalizedInsights: string[];
  nextSteps: string[];
  alternativeRoles?: string[];
  confidenceScore: number;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: AssessmentResponse[];
  isComplete: boolean;
  results?: AssessmentResults;
}