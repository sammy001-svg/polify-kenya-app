import { mockVoterStats, mockRegistrationCentres, mockNews, mockJobs } from '@/data/iebc-data';

interface AnalysisData {
  totalVoters: number;
  openCentres: number;
}

export interface AIResponse {
  text: string;
  type: 'analysis' | 'answer';
  data?: AnalysisData;
}

export async function analyzeIEBCData(): Promise<AIResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const totalVoters = mockVoterStats.find(s => s.category === 'National')?.count || 0;
  const openCentres = mockRegistrationCentres.filter(c => c.status === 'Open').length;
  const totalCentres = mockRegistrationCentres.length;
  
  const analysis = `
    Based on the latest data analysis:
    
    1. **Voter Registration**: Direct analysis of the national register shows a total of **${totalVoters.toLocaleString()}** registered voters.
    
    2. **Infrastructure**: We are currently tracking **${totalCentres}** registration centres in your region of interest, with **${openCentres}** currently verified as OPEN and operational.
    
    3. **Engagement**: There are **${mockNews.length}** active news updates and **${mockJobs.length}** career opportunities listed.
    
    **Recommendation**: Voter mobilization in "Westlands" constituency shows a favorable trend compared to the national average.
  `;

  return {
    text: analysis,
    type: 'analysis',
    data: { totalVoters, openCentres }
  };
}

export async function askIEBCAI(question: string): Promise<AIResponse> {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const q = question.toLowerCase();
  let answer = "I'm not sure about that. Try asking about 'voters', 'centres', 'jobs', or 'news'.";

  if (q.includes('voter') || q.includes('how many')) {
    const national = mockVoterStats.find(s => s.category === 'National');
    answer = `As of the latest register, there are **${national?.count.toLocaleString()}** registered voters nationally.`;
  } else if (q.includes('centre') || q.includes('where')) {
     answer = `You can find registration centres in the "Registration Centres" section. We have listed **${mockRegistrationCentres.length}** centres in the current view.`;
  } else if (q.includes('job') || q.includes('work') || q.includes('vacancy')) {
    answer = `There are currently **${mockJobs.length}** open positions at the IEBC. Check the 'Career Opportunities' card for details.`;
  } else if (q.includes('deadline') || q.includes('when')) {
    answer = "The current voter registration phase is ongoing. The specific deadline for the mass voter registration drive hasn't been officially closed yet according to the latest press release.";
  }

  return {
    text: answer,
    type: 'answer'
  };
}
