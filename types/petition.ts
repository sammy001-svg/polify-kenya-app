export interface Petition {
  id: string;
  created_by: string;
  title: string;
  description: string | null;
  image_url: string | null;
  target_signatures: number;
  current_signatures: number;
  status: 'active' | 'closed' | 'victory';
  created_at: string;
}

export interface Signature {
  id: string;
  petition_id: string;
  user_id: string;
  created_at: string;
}
