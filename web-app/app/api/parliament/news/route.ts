import { NextResponse } from 'next/server';
import { fetchParliamentNews } from '@/lib/news-service';

export async function GET() {
  try {
    const news = await fetchParliamentNews();
    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error fetching parliament news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
