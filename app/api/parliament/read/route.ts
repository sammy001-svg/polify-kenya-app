import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import DOMPurify from 'isomorphic-dompurify';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // 1. Fetch the external page
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.google.com/',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.status}`);
    }

    const html = await response.text();

    // 2. Parse with JSDOM
    const doc = new JSDOM(html, { url });
    
    // 3. Extract content with Readability
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
        return NextResponse.json({ error: 'Failed to extract content' }, { status: 500 });
    }

    // 4. Sanitize Content
    const cleanContent = DOMPurify.sanitize(article.content);

    return NextResponse.json({
        title: article.title,
        byline: article.byline,
        content: cleanContent,
        textContent: article.textContent,
        siteName: article.siteName || new URL(url).hostname,
        url: url,
        excerpt: article.excerpt
    });

  } catch (error) {
    console.error('Error in Reader Mode:', error);
    return NextResponse.json({ error: 'Failed to process article' }, { status: 500 });
  }
}
