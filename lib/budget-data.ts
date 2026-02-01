export interface BudgetCategory {
  id: string;
  name: string;
  type: 'revenue' | 'expenditure';
  value: number; // In Billions KES
  min: number;
  max: number;
  description: string;
  impact: {
    happiness: number; // -10 to +10 impact per 100B change
    growth: number; // -5% to +5% GDP growth impact per 100B change
  };
}

export const INITIAL_BUDGET: BudgetCategory[] = [
  // Revenue
  {
    id: 'income-tax',
    name: 'Income Tax (PAYE)',
    type: 'revenue',
    value: 1200,
    min: 800,
    max: 2000,
    description: 'Tax collected from employment income.',
    impact: { happiness: -1.5, growth: -0.5 } // High tax hurts happiness slightly, impacts spending power
  },
  {
    id: 'vat',
    name: 'Value Added Tax (VAT)',
    type: 'revenue',
    value: 800,
    min: 500,
    max: 1500,
    description: 'Consumption tax on goods and services.',
    impact: { happiness: -2.0, growth: -0.8 } // High VAT hurts poor most
  },
  {
    id: 'borrowing',
    name: 'Domestic/Foreign Borrowing',
    type: 'revenue',
    value: 700,
    min: 0,
    max: 1500,
    description: 'Loans to bridge the budget deficit.',
    impact: { happiness: 0.5, growth: 1.0 } // Short term gain, long term pain (simplified)
  },

  // Expenditure
  {
    id: 'education',
    name: 'Education',
    type: 'expenditure',
    value: 650,
    min: 300,
    max: 1200,
    description: 'Free primary education, universities, and teachers.',
    impact: { happiness: 3.0, growth: 2.5 }
  },
  {
    id: 'health',
    name: 'Healthcare (SHIF)',
    type: 'expenditure',
    value: 400,
    min: 200,
    max: 1000,
    description: 'Hospitals, medicine, and medical staff.',
    impact: { happiness: 4.0, growth: 1.5 }
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    type: 'expenditure',
    value: 500,
    min: 200,
    max: 1500,
    description: 'Roads, railways, and energy projects.',
    impact: { happiness: 1.0, growth: 3.0 }
  },
  {
    id: 'debt-repayment',
    name: 'Debt Servicing',
    type: 'expenditure',
    value: 1100, // Very high in Kenya currently
    min: 1100, // Fixed cost basically
    max: 1100,
    description: 'Mandatory interest and principal payments on loans.',
    impact: { happiness: -0.5, growth: -0.2 } // Dead money basically
  },
  {
    id: 'county-allocation',
    name: 'County Allocation',
    type: 'expenditure',
    value: 400,
    min: 300,
    max: 800,
    description: 'Funds sent to the 47 counties for devolution.',
    impact: { happiness: 2.5, growth: 1.0 }
  }
];

export function calculateBudgetOutcome(budget: BudgetCategory[]) {
  const totalRevenue = budget
    .filter(c => c.type === 'revenue')
    .reduce((sum, c) => sum + c.value, 0);

  const totalExpenditure = budget
    .filter(c => c.type === 'expenditure')
    .reduce((sum, c) => sum + c.value, 0);

  const deficit = totalRevenue - totalExpenditure;

  // Calculate scores (Simplified Logic)
  let happinessScore = 50; // Base score
  let growthScore = 3.0; // Base GDP growth 3%

  budget.forEach(item => {
    const diff = item.value - (INITIAL_BUDGET.find(i => i.id === item.id)?.value || item.value);
    const units = diff / 100; // Per 100B change

    happinessScore += (units * item.impact.happiness);
    growthScore += (units * item.impact.growth);
  });

  // Deficit Penalty
  if (deficit < -500) {
    happinessScore -= 10; // High deficit scares people (inflation fears)
    growthScore += 0.5; // Stimulus effect
  } else if (deficit > 0) {
    happinessScore += 5; // Surplus is good? Maybe tax was too high though
    growthScore -= 0.5; // Contractionary
  }

  // Cap scores
  happinessScore = Math.min(100, Math.max(0, happinessScore));

  return {
    totalRevenue,
    totalExpenditure,
    deficit,
    happinessScore,
    growthScore
  };
}
