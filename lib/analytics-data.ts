
export interface DemographicData {
  ageGroup: string;
  percentage: number;
  genderSplit: { male: number; female: number; other: number };
}

export interface WardData {
  id: string;
  name: string;
  registeredVoters: number;
  projectedTurnout: number;
  supportLevel: 'Strong' | 'Leaning' | 'Swing' | 'Weak' | 'Lost';
  topIssues: string[];
}

export interface IssueIntensity {
  issue: string;
  intensity: number; // 1-10
  wardId: string;
}

export interface Voter {
  id: string;
  name: string;
  ward: string;
  phone: string;
  age: number;
  gender: string;
  supportStatus: 'Strong Supporter' | 'Leaning' | 'Undecided' | 'Opposed';
  lastContactDate: string;
  tags: string[]; // e.g., "Volunteer", "Donor", "Needs Transport"
}

export const MOCK_DEMOGRAPHICS: DemographicData[] = [
  { ageGroup: '18-24', percentage: 35, genderSplit: { male: 48, female: 52, other: 0 } },
  { ageGroup: '25-34', percentage: 28, genderSplit: { male: 50, female: 50, other: 0 } },
  { ageGroup: '35-49', percentage: 22, genderSplit: { male: 55, female: 45, other: 0 } },
  { ageGroup: '50+', percentage: 15, genderSplit: { male: 45, female: 55, other: 0 } },
];

export const MOCK_WARDS: WardData[] = [
  { id: 'w1', name: 'Kangemi', registeredVoters: 15000, projectedTurnout: 70, supportLevel: 'Strong', topIssues: ['Sanitation', 'Water'] },
  { id: 'w2', name: 'Mountain View', registeredVoters: 8500, projectedTurnout: 65, supportLevel: 'Leaning', topIssues: ['Security', 'Roads'] },
  { id: 'w3', name: 'Parklands', registeredVoters: 12000, projectedTurnout: 60, supportLevel: 'Swing', topIssues: ['Traffic', 'Business Licenses'] },
  { id: 'w4', name: 'Kitisuru', registeredVoters: 6000, projectedTurnout: 55, supportLevel: 'Weak', topIssues: ['Planning Zoning', 'Security'] },
];

export const MOCK_VOTERS: Voter[] = [
    { id: 'v1', name: 'John Kamau', ward: 'Kangemi', phone: '254712345678', age: 24, gender: 'Male', supportStatus: 'Strong Supporter', lastContactDate: '2026-01-20', tags: ['Volunteer'] },
    { id: 'v2', name: 'Alice Wanjiku', ward: 'Mountain View', phone: '254722334455', age: 32, gender: 'Female', supportStatus: 'Undecided', lastContactDate: '2026-01-10', tags: [] },
    { id: 'v3', name: 'Mohammed Ali', ward: 'Parklands', phone: '254733445566', age: 45, gender: 'Male', supportStatus: 'Leaning', lastContactDate: '2026-01-22', tags: ['Donor'] },
    { id: 'v4', name: 'Grace Ochieng', ward: 'Kitisuru', phone: '254744556677', age: 50, gender: 'Female', supportStatus: 'Opposed', lastContactDate: '2025-12-15', tags: [] },
    { id: 'v5', name: 'Peter Njoroge', ward: 'Kangemi', phone: '254755667788', age: 21, gender: 'Male', supportStatus: 'Strong Supporter', lastContactDate: '2026-01-25', tags: ['Needs Transport'] },
];
