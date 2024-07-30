import { generateSitemap } from '@/utils/sitemap';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const sitemap = await generateSitemap();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
