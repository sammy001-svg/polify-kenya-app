export interface MediaChannel {
  id: string;
  name: string;
  streamUrl: string; // YouTube ID or m3u8
  logo: string; // Emoji for demo
  category: 'Politics' | 'Governance' | 'Public Services' | 'News';
  isLive: boolean;
  viewerCount: string;
  currentProgram: string;
}

export const KENYAN_MEDIA_CHANNELS: MediaChannel[] = [
  {
    id: 'citizen',
    name: 'Citizen TV',
    streamUrl: 'https://www.youtube.com/embed/jZ6p4-eI0gI', // Example YouTube Live ID
    logo: '📺',
    category: 'News',
    isLive: true,
    viewerCount: '45.2K',
    currentProgram: 'News Night: The Political Heat'
  },
  {
    id: 'ntv',
    name: 'NTV Kenya',
    streamUrl: 'https://www.youtube.com/embed/live_stream_id_2', 
    logo: '📰',
    category: 'Politics',
    isLive: true,
    viewerCount: '32.1K',
    currentProgram: 'Press Pass: Media Freedom'
  },
  {
    id: 'ktn',
    name: 'KTN News',
    streamUrl: 'https://www.youtube.com/embed/live_stream_id_3',
    logo: '📡',
    category: 'News',
    isLive: true,
    viewerCount: '18.5K',
    currentProgram: 'Checkpoint'
  },
  {
    id: 'kbc',
    name: 'KBC Channel 1',
    streamUrl: 'https://www.youtube.com/embed/live_stream_id_4',
    logo: '🦁',
    category: 'Public Services',
    isLive: true,
    viewerCount: '12K',
    currentProgram: 'The Great KBC Lunch Time News'
  },
  {
    id: 'parliament',
    name: 'Parliament Live',
    streamUrl: 'https://www.youtube.com/embed/live_stream_id_5',
    logo: '🏛️',
    category: 'Governance',
    isLive: false,
    viewerCount: 'Offline',
    currentProgram: 'Senate Proceedings (Resumes 2PM)'
  }
];
