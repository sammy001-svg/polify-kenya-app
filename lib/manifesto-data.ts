export interface ManifestoItem {
  id: string;
  issue: string; // "Youth Employment"
  problem: string; // "High unemployment due to..."
  solution: string; // "Create tech hubs in every ward..."
  implementation: string; // "Partner with Google and County govt..."
  outcome: string; // "5000 new jobs per year..."
  timeline: 'Short-term' | 'Medium-term' | 'Long-term';
  alignmentScore: number; // 0-100
  flags: string[]; // ["Vague", "Outside Mandate"]
}

export const MOCK_MANIFESTO: ManifestoItem[] = [
    {
        id: 'm1',
        issue: 'Education Infrastructure',
        problem: 'Overcrowded classrooms in primary schools, with 1 teacher for 80 pupils.',
        solution: 'Build 5 new classrooms in every public primary school using NG-CDF.',
        implementation: 'Allocate 40% of NG-CDF budget to education projects in first 2 years.',
        outcome: 'Reduce student-teacher ratio to 1:45 and specific classroom capacity.',
        timeline: 'Medium-term',
        alignmentScore: 95,
        flags: []
    }
];
