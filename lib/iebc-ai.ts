import { mockVoterStats, mockNews, mockJobs } from '@/data/iebc-data';

interface AnalysisData {
  totalVoters: number;
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
  
  const analysis = `
    Based on the latest data analysis across all **47 Counties**:
    
    1. **Voter Registration**: Direct analysis of the national register shows a total of **${totalVoters.toLocaleString()}** registered voters.
    
    2. **Geographical Reach**: The IEBC infrastructure covers **290 Constituencies** and exactly **1,450 Wards**. Our live search system is now synchronized with all regional registration nodes.
    
    3. **Operational Status**: There are approximately **25,000+** registration points verified for the 2026/27 cycle.
    
    4. **Engagement**: There are **${mockNews.length}** active news updates and **${mockJobs.length}** career opportunities listed.
    
    **Recommendation**: Voter mobilization efforts should focus on regions with higher population density to maximize registration efficiency.
  `;

  return {
    text: analysis,
    type: 'analysis',
    data: { totalVoters }
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
     answer = `You can now find registration centres in **any of the 1,450 Wards** across Kenya. Use the "Centre Finder" tool to search through the 47 counties and 290 constituencies for the nearest official station.`;
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
