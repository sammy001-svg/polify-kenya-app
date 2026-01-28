export type ContentType = 'video' | 'explainer' | 'response' | 'highlight' | 'plan';
export type ContentTag = 'Policy' | 'Vision' | 'Opinion' | 'Response' | 'Update';

export interface CampaignPost {
  id: string;
  type: ContentType;
  tag: ContentTag;
  title: string;
  content: string; // Text content or Video URL/Description
  mediaUrl?: string;
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  metrics: {
    views: number;
    likes: number;
    shares: number;
  };
}

export const CONTENT_TYPES: { id: ContentType; label: string; icon: string }[] = [
  { id: 'video', label: 'Short-form Video', icon: '📹' },
  { id: 'explainer', label: 'Policy Explainer', icon: '📝' },
  { id: 'response', label: 'Issue Response', icon: '💬' },
  { id: 'highlight', label: 'Town Hall Highlight', icon: '📢' },
  { id: 'plan', label: 'Development Plan', icon: '🏗️' },
];

export const CONTENT_TAGS: ContentTag[] = ['Policy', 'Vision', 'Opinion', 'Response', 'Update'];

export const MOCK_POSTS: CampaignPost[] = [
  {
    id: 'p1',
    type: 'explainer',
    tag: 'Policy',
    title: 'My Plan for Youth Employment',
    content: 'We need to focus on digital skills training...',
    status: 'published',
    publishDate: '2026-01-20',
    metrics: { views: 1200, likes: 340, shares: 50 },
  },
  {
    id: 'p2',
    type: 'video',
    tag: 'Vision',
    title: 'Campaign Launch Rally',
    content: 'Highlights from our massive turnout in Westlands!',
    mediaUrl: '/videos/launch.mp4',
    status: 'published',
    publishDate: '2026-01-15',
    metrics: { views: 5000, likes: 890, shares: 200 },
  },
];
