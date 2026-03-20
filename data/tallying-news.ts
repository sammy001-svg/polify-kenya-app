export interface NewsItem {
  id: number;
  title: string;
  time: string;
  type: "LIVE" | "ALERT" | "DATA" | "INFO" | "UPDATE";
  avatar: string;
  summary: string;
}

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Mombasa Tallying Complete",
    time: "2 mins ago",
    type: "LIVE",
    avatar: "https://i.pravatar.cc/150?u=1",
    summary: "Presidential tallies from Coast regions show high voter integrity.",
  },
  {
    id: 2,
    title: "Nairobi Turnout Hits 72%",
    time: "15 mins ago",
    type: "DATA",
    avatar: "https://i.pravatar.cc/150?u=2",
    summary: "Urban voter turnout exceeds 2022 records by 15%.",
  },
  {
    id: 3,
    title: "IEBC System Verified",
    time: "1 hr ago",
    type: "INFO",
    avatar: "https://i.pravatar.cc/150?u=3",
    summary: "Independent audit confirms blockchain-backed tally security.",
  },
  {
    id: 4,
    title: "Suspicious Activity Flagged",
    time: "1 hr 20 mins ago",
    type: "ALERT",
    avatar: "https://i.pravatar.cc/150?u=4",
    summary: "Anomaly detection triggered in 3 Rift Valley constituencies.",
  },
  {
    id: 5,
    title: "Form 34A Data Uploaded",
    time: "2 hrs ago",
    type: "UPDATE",
    avatar: "https://i.pravatar.cc/150?u=5",
    summary: "41 additional returning officers upload verified forms.",
  },
  {
    id: 6,
    title: "North Eastern Tallying",
    time: "2 hrs 30 mins ago",
    type: "LIVE",
    avatar: "https://i.pravatar.cc/150?u=6",
    summary: "Garissa, Wajir, and Mandera results streaming in now.",
  },
  {
    id: 7,
    title: "Rift Valley Count Update",
    time: "3 hrs ago",
    type: "DATA",
    avatar: "https://i.pravatar.cc/150?u=7",
    summary: "28 constituencies now fully reporting. 6 still pending.",
  },
  {
    id: 8,
    title: "Diaspora Votes Transmitted",
    time: "4 hrs ago",
    type: "INFO",
    avatar: "https://i.pravatar.cc/150?u=8",
    summary: "IEBC confirms encrypted diaspora ballot data received from 12 countries.",
  },
];
