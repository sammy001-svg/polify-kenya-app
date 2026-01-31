export interface CountyBudget {
  county: string;
  totalAllocation: number;
  totalSpent: number;
  fiscalYear: string;
  departmentalBreakdown: {
    department: string;
    allocated: number;
    spent: number;
    projectsCount: number;
  }[];
}

export const MOCK_COUNTY_BUDGETS: Record<string, CountyBudget> = {
  "Nairobi": {
    county: "Nairobi",
    totalAllocation: 38.5, // in Billions
    totalSpent: 31.2,
    fiscalYear: "2023/24",
    departmentalBreakdown: [
      { department: "Health", allocated: 12.0, spent: 9.5, projectsCount: 45 },
      { department: "Infrastructure", allocated: 10.5, spent: 9.2, projectsCount: 112 },
      { department: "Education", allocated: 5.0, spent: 4.8, projectsCount: 38 },
      { department: "Water", allocated: 7.0, spent: 4.2, projectsCount: 24 },
      { department: "Security", allocated: 4.0, spent: 3.5, projectsCount: 15 }
    ]
  },
  "Mombasa": {
    county: "Mombasa",
    totalAllocation: 14.2,
    totalSpent: 11.5,
    fiscalYear: "2023/24",
    departmentalBreakdown: [
      { department: "Tourism", allocated: 4.0, spent: 3.2, projectsCount: 22 },
      { department: "Health", allocated: 5.0, spent: 4.1, projectsCount: 18 },
      { department: "Infrastructure", allocated: 5.2, spent: 4.2, projectsCount: 40 }
    ]
  }
};

export const getCountyBudget = (countyName: string): CountyBudget => {
  return MOCK_COUNTY_BUDGETS[countyName] || {
    county: countyName,
    totalAllocation: 0,
    totalSpent: 0,
    fiscalYear: "2023/24",
    departmentalBreakdown: []
  };
};
