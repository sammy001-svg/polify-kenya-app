import { PwaManager } from './pwa-manager';

export type IssueCategory = 'Infrastructure' | 'Water' | 'Health' | 'Education' | 'Security' | 'Environment';
export type IssueStatus = 'Reported' | 'Verified' | 'Investigating' | 'Addressed';

export interface ResponseStep {
  status: IssueStatus;
  label: string;
  timestamp: string;
  agency?: string;
  notes?: string;
}

export interface GrassrootsReport {
  id: string;
  userId: string;
  category: IssueCategory;
  title: string;
  description: string;
  location: {
    ward: string;
    county: string;
    coordinates?: { lat: number; lng: number };
  };
  timestamp: string;
  status: IssueStatus;
  vouchCount: number;
  isHotspot?: boolean;
  _offline?: boolean;
  responseTimeline?: ResponseStep[];
  assignedAgency?: string;
  resolvedAt?: string;
  reporter?: {
    name: string;
    username: string;
    avatarUrl?: string;
  };
}

const OFFLINE_KEY = 'grassroots_offline_reports';

export const MOCK_REPORTS: GrassrootsReport[] = [
  {
    id: 'report-1',
    userId: 'user-123',
    category: 'Water',
    title: 'No water for 3 days',
    description: 'The main pipe near the market burst and hasn\'t been fixed.',
    location: { ward: 'Upper Hill', county: 'Nairobi' },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'Verified',
    vouchCount: 12,
    isHotspot: true,
    responseTimeline: [
      { status: 'Reported', label: 'Issue Logged', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { status: 'Verified', label: 'Community Verified', timestamp: new Date(Date.now() - 1800000).toISOString(), notes: '12 neighbors vouched.' }
    ],
    reporter: {
      name: "Brian Kimani",
      username: "@SiasaDecoded",
      avatarUrl: "/creators/siasa-decoded.jpg"
    }
  },
  {
    id: 'report-2',
    userId: 'user-456',
    category: 'Infrastructure',
    title: 'Large pothole on Haile Selassie Ave',
    description: 'Dangerous pothole causing traffic and potential accidents.',
    location: { ward: 'CBD', county: 'Nairobi' },
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: 'Reported',
    vouchCount: 5,
    reporter: {
      name: "Sharon Wanjiru",
      username: "@TheCivicMillennial",
      avatarUrl: "/creators/civic-millennial.jpg"
    }
  },
  {
    id: 'report-3',
    userId: 'user-789',
    category: 'Security',
    title: 'Street lights not working',
    description: 'The whole stretch of road is dark at night, making it unsafe.',
    location: { ward: 'Old Town', county: 'Mombasa' },
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    status: 'Investigating',
    vouchCount: 8,
    assignedAgency: 'Mombasa County Lighting Dept',
    responseTimeline: [
      { status: 'Reported', label: 'Issue Logged', timestamp: new Date(Date.now() - 172800000).toISOString() },
      { status: 'Verified', label: 'Community Verified', timestamp: new Date(Date.now() - 150000000).toISOString() },
      { status: 'Investigating', label: 'Agency Dispatched', timestamp: new Date(Date.now() - 86400000).toISOString(), agency: 'Mombasa County Lighting Dept' }
    ]
  }
];

export const GrassrootsService = {
  getReportsByCounty(county: string) {
    const offline = PwaManager.getOfflineData(OFFLINE_KEY);
    return [...offline, ...MOCK_REPORTS].filter(r => r.location.county === county);
  },
  
  async submitReport(report: Omit<GrassrootsReport, 'id' | 'timestamp' | 'vouchCount' | 'status'>) {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    
    const newReport: GrassrootsReport = {
      ...report,
      id: `report-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      vouchCount: 0,
      status: 'Reported',
      _offline: !isOnline
    };

    if (!isOnline) {
      PwaManager.saveOfflineData(OFFLINE_KEY, newReport);
      console.log('Offline: Saved report to local storage');
      return { ...newReport, _offline: true };
    }

    // In a real app, this would be a Supabase call
    console.log('Online: Report submitted to server:', newReport);
    return newReport;
  },
  
  async syncOfflineReports() {
    const offline = PwaManager.getOfflineData(OFFLINE_KEY);
    if (offline.length === 0) return;
    
    console.log(`Syncing ${offline.length} offline reports...`);
    // Mock sync
    PwaManager.clearOfflineData(OFFLINE_KEY);
  },

  async vouchForIssue(reportId: string) {
      console.log(`Vouched for report ${reportId}`);
      return { success: true };
  }
};
