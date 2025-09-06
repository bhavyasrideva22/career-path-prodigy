export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options?: string[];
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  weight: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  totalWeight: number;
}

export const assessmentData: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Psychometric Assessment',
    description: 'Assess your personality traits, interests, and work style compatibility with Treasury Analyst roles.',
    totalWeight: 30,
    questions: [
      {
        id: 'psyc_1',
        text: 'I enjoy creating spreadsheets to solve real-world problems.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'interest',
        weight: 5,
      },
      {
        id: 'psyc_2',
        text: 'In uncertain economic conditions, I feel confident making data-driven decisions.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'confidence',
        weight: 5,
      },
      {
        id: 'psyc_3',
        text: 'I often double-check my work for accuracy.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'conscientiousness',
        weight: 5,
      },
      {
        id: 'psyc_4',
        text: 'I prefer structured, process-oriented work environments.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'work-style',
        weight: 5,
      },
      {
        id: 'psyc_5',
        text: 'I find financial markets and economic trends fascinating.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'interest',
        weight: 5,
      },
      {
        id: 'psyc_6',
        text: 'When facing complex problems, I break them down into manageable parts.',
        type: 'likert',
        category: 'psychometric',
        subcategory: 'analytical-thinking',
        weight: 5,
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Aptitude Assessment',
    description: 'Evaluate your numerical reasoning, financial knowledge, and domain-specific readiness.',
    totalWeight: 40,
    questions: [
      {
        id: 'tech_1',
        text: 'If a company expects an inflow of $5M in 30 days and outflows of $4M, what is the projected net cash position?',
        type: 'multiple-choice',
        options: ['$1M positive', '$1M negative', '$9M positive', 'Cannot be determined'],
        category: 'technical',
        subcategory: 'cash-flow',
        weight: 8,
      },
      {
        id: 'tech_2',
        text: 'A 10% increase in interest rates will most significantly affect which treasury function?',
        type: 'multiple-choice',
        options: ['Cash positioning', 'Investment portfolio valuation', 'Bank reconciliation', 'Expense reporting'],
        category: 'technical',
        subcategory: 'interest-rates',
        weight: 8,
      },
      {
        id: 'tech_3',
        text: 'What is the Net Present Value (NPV) of receiving $1,000 in one year with a 5% discount rate?',
        type: 'multiple-choice',
        options: ['$952.38', '$1,050.00', '$950.00', '$1,000.00'],
        category: 'technical',
        subcategory: 'time-value',
        weight: 8,
      },
      {
        id: 'tech_4',
        text: 'Foreign exchange risk is primarily managed through:',
        type: 'multiple-choice',
        options: ['Hedging instruments', 'Cash hoarding', 'Expense reduction', 'Revenue diversification'],
        category: 'technical',
        subcategory: 'fx-risk',
        weight: 8,
      },
      {
        id: 'tech_5',
        text: 'If EUR/USD moves from 1.1000 to 1.1100, the EUR has:',
        type: 'multiple-choice',
        options: ['Appreciated against USD', 'Depreciated against USD', 'Remained stable', 'Cannot be determined'],
        category: 'technical',
        subcategory: 'fx-analysis',
        weight: 8,
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework Analysis',
    description: 'Multi-dimensional assessment of your readiness across Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment.',
    totalWeight: 30,
    questions: [
      {
        id: 'wiscar_1',
        text: 'When facing a skills gap in financial analysis, what is your typical approach?',
        type: 'multiple-choice',
        options: [
          'Immediately seek out online courses or resources to learn',
          'Ask colleagues for help and guidance',
          'Try to work around the gap using existing skills',
          'Wait for formal training opportunities'
        ],
        category: 'wiscar',
        subcategory: 'ability-to-learn',
        weight: 5,
      },
      {
        id: 'wiscar_2',
        text: 'How often do you analyze financial headlines and think about their broader economic impact?',
        type: 'multiple-choice',
        options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
        category: 'wiscar',
        subcategory: 'interest',
        weight: 5,
      },
      {
        id: 'wiscar_3',
        text: 'Describe your consistency when working under pressure.',
        type: 'multiple-choice',
        options: [
          'I maintain high performance and stay organized',
          'I perform well but may need occasional support',
          'I struggle initially but adapt quickly',
          'Pressure significantly impacts my performance'
        ],
        category: 'wiscar',
        subcategory: 'will',
        weight: 5,
      },
      {
        id: 'wiscar_4',
        text: 'Rate your current proficiency with financial modeling and Excel.',
        type: 'multiple-choice',
        options: ['Expert level', 'Advanced', 'Intermediate', 'Beginner'],
        category: 'wiscar',
        subcategory: 'skill',
        weight: 5,
      },
      {
        id: 'wiscar_5',
        text: 'When solving complex financial problems, you typically:',
        type: 'multiple-choice',
        options: [
          'Break them into logical steps and work systematically',
          'Look for patterns from similar past problems',
          'Collaborate with others to find solutions',
          'Use intuition and experience to guide decisions'
        ],
        category: 'wiscar',
        subcategory: 'cognitive',
        weight: 5,
      },
      {
        id: 'wiscar_6',
        text: 'How well does treasury work align with your long-term career goals?',
        type: 'multiple-choice',
        options: [
          'Perfect alignment - this is exactly what I want to do',
          'Good fit - aligns with most of my goals',
          'Partial fit - some aspects appeal to me',
          'Poor fit - not really aligned with my goals'
        ],
        category: 'wiscar',
        subcategory: 'real-world-alignment',
        weight: 5,
      }
    ]
  }
];

export const correctAnswers: Record<string, number> = {
  tech_1: 0, // $1M positive
  tech_2: 1, // Investment portfolio valuation
  tech_3: 0, // $952.38
  tech_4: 0, // Hedging instruments
  tech_5: 0, // Appreciated against USD
};

export const likertScale = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree'
];