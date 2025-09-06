import { AssessmentResponse, ScoreBreakdown, WiscarScores, AssessmentResults } from "@/types/assessment";
import { correctAnswers } from "@/data/assessmentData";

export function calculateScores(responses: AssessmentResponse[]): AssessmentResults {
  const scores: ScoreBreakdown = {
    psychometric: 0,
    technical: 0,
    wiscar: 0,
    overall: 0,
  };

  const wiscarScores: WiscarScores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    abilityToLearn: 0,
    realWorldAlignment: 0,
  };

  let totalPsychometricWeight = 0;
  let totalTechnicalWeight = 0;
  let totalWiscarWeight = 0;

  const wiscarCounts = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    abilityToLearn: 0,
    realWorldAlignment: 0,
  };

  // Calculate scores by category
  responses.forEach(response => {
    const { category, subcategory, answer, weight, questionId } = response;
    
    if (category === 'psychometric') {
      // For Likert scale (0-4), normalize to 0-100
      const normalizedScore = (answer / 4) * 100;
      scores.psychometric += normalizedScore * weight;
      totalPsychometricWeight += weight;
    } else if (category === 'technical') {
      // For multiple choice, check if answer is correct
      const isCorrect = correctAnswers[questionId] === answer;
      const normalizedScore = isCorrect ? 100 : 0;
      scores.technical += normalizedScore * weight;
      totalTechnicalWeight += weight;
    } else if (category === 'wiscar') {
      // For WISCAR, map to subcategories and normalize scores
      let normalizedScore = 0;
      
      if (subcategory === 'ability-to-learn') {
        normalizedScore = answer === 0 ? 100 : answer === 1 ? 75 : answer === 2 ? 50 : 25;
        wiscarScores.abilityToLearn += normalizedScore;
        wiscarCounts.abilityToLearn++;
      } else if (subcategory === 'interest') {
        normalizedScore = answer === 0 ? 100 : answer === 1 ? 75 : answer === 2 ? 50 : 25;
        wiscarScores.interest += normalizedScore;
        wiscarCounts.interest++;
      } else if (subcategory === 'will') {
        normalizedScore = answer === 0 ? 100 : answer === 1 ? 75 : answer === 2 ? 50 : 25;
        wiscarScores.will += normalizedScore;
        wiscarCounts.will++;
      } else if (subcategory === 'skill') {
        normalizedScore = answer === 0 ? 100 : answer === 1 ? 80 : answer === 2 ? 60 : 30;
        wiscarScores.skill += normalizedScore;
        wiscarCounts.skill++;
      } else if (subcategory === 'cognitive') {
        normalizedScore = answer === 0 ? 100 : answer === 1 ? 80 : answer === 2 ? 70 : 60;
        wiscarScores.cognitive += normalizedScore;
        wiscarCounts.cognitive++;
      } else if (subcategory === 'real-world-alignment') {
        normalizedScore = answer === 0 ? 100 : answer === 1 ? 75 : answer === 2 ? 50 : 25;
        wiscarScores.realWorldAlignment += normalizedScore;
        wiscarCounts.realWorldAlignment++;
      }
      
      scores.wiscar += normalizedScore * weight;
      totalWiscarWeight += weight;
    }
  });

  // Normalize scores to 0-100 scale
  if (totalPsychometricWeight > 0) {
    scores.psychometric = scores.psychometric / totalPsychometricWeight;
  }
  if (totalTechnicalWeight > 0) {
    scores.technical = scores.technical / totalTechnicalWeight;
  }
  if (totalWiscarWeight > 0) {
    scores.wiscar = scores.wiscar / totalWiscarWeight;
  }

  // Calculate WISCAR averages
  Object.keys(wiscarCounts).forEach(key => {
    const typedKey = key as keyof WiscarScores;
    if (wiscarCounts[typedKey] > 0) {
      wiscarScores[typedKey] = wiscarScores[typedKey] / wiscarCounts[typedKey];
    }
  });

  // Calculate overall weighted score
  scores.overall = (scores.psychometric * 0.3 + scores.technical * 0.4 + scores.wiscar * 0.3);

  // Determine recommendation
  let recommendation: 'strong-fit' | 'moderate-fit' | 'poor-fit';
  if (scores.overall >= 75) {
    recommendation = 'strong-fit';
  } else if (scores.overall >= 60) {
    recommendation = 'moderate-fit';
  } else {
    recommendation = 'poor-fit';
  }

  // Generate personalized insights
  const personalizedInsights = generatePersonalizedInsights(scores, wiscarScores);
  const nextSteps = generateNextSteps(recommendation, scores);
  const alternativeRoles = recommendation === 'poor-fit' ? generateAlternativeRoles() : undefined;
  const confidenceScore = calculateConfidenceScore(scores);

  return {
    scores,
    wiscarScores,
    recommendation,
    personalizedInsights,
    nextSteps,
    alternativeRoles,
    confidenceScore,
  };
}

function generatePersonalizedInsights(scores: ScoreBreakdown, wiscarScores: WiscarScores): string[] {
  const insights = [];

  if (scores.technical >= 80) {
    insights.push("You demonstrate strong technical proficiency in financial analysis and treasury concepts.");
  } else if (scores.technical >= 60) {
    insights.push("Your technical foundation is solid but could benefit from reinforcement in specific treasury areas.");
  } else {
    insights.push("Building core financial and technical skills should be your immediate priority.");
  }

  if (scores.psychometric >= 80) {
    insights.push("Your personality profile strongly aligns with successful Treasury Analysts - you show excellent analytical thinking and attention to detail.");
  }

  if (wiscarScores.abilityToLearn >= 80) {
    insights.push("Your learning agility is excellent, which will serve you well in this evolving field.");
  }

  if (wiscarScores.interest >= 80) {
    insights.push("Your genuine interest in financial markets and economic trends is a strong indicator of long-term success.");
  }

  return insights;
}

function generateNextSteps(recommendation: string, scores: ScoreBreakdown): string[] {
  const steps = [];

  if (recommendation === 'strong-fit') {
    steps.push("Enroll in 'Corporate Treasury Foundations' course");
    steps.push("Learn Treasury Management Systems (TMS) like Kyriba or SAP");
    steps.push("Explore FX hedging tools and strategies");
    steps.push("Apply for entry-level Treasury Analyst positions");
  } else if (recommendation === 'moderate-fit') {
    if (scores.technical < 70) {
      steps.push("Strengthen your foundation with 'Finance 101' and 'Excel for Financial Modeling'");
    }
    steps.push("Take 'Corporate Treasury Basics' course");
    steps.push("Practice cash flow forecasting exercises");
    steps.push("Consider internship or entry-level finance roles first");
  } else {
    steps.push("Take fundamental finance and accounting courses");
    steps.push("Build Excel and analytical skills");
    steps.push("Explore related fields like Financial Planning & Analysis");
    steps.push("Consider whether finance is the right career path");
  }

  return steps;
}

function generateAlternativeRoles(): string[] {
  return [
    "Financial Planning & Analysis (FP&A) - More forecasting, less risk management",
    "Risk Analyst - Stronger emphasis on modeling and analytics",
    "Operations Analyst - Structure and process focus with less financial complexity",
    "Business Analyst - Analytical skills applied to broader business problems",
  ];
}

function calculateConfidenceScore(scores: ScoreBreakdown): number {
  // Higher confidence when scores are either very high or very low (clear signal)
  const variance = Math.pow(scores.psychometric - scores.overall, 2) + 
                  Math.pow(scores.technical - scores.overall, 2) + 
                  Math.pow(scores.wiscar - scores.overall, 2);
  
  const consistency = Math.max(0, 100 - variance / 100);
  const strength = Math.abs(scores.overall - 50) * 2; // Distance from neutral
  
  return Math.min(100, (consistency + strength) / 2);
}