import { MetadataRoute } from 'next';
import { PARTIES_DATA } from '@/lib/parties-data';
import { CONSTITUTION_CHAPTERS } from '@/lib/constitution-data';
import { SAMPLE_POLITICIANS } from '@/lib/representatives';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://polify-kenya-app.vercel.app';
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/tracker`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/representatives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/campaign`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iebc`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/justice`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/constitution`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/parliament`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/feed`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
  ];

  const partyRoutes: MetadataRoute.Sitemap = PARTIES_DATA.map((party) => ({
    url: `${baseUrl}/parties/${party.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const politicianRoutes: MetadataRoute.Sitemap = SAMPLE_POLITICIANS.map((politician) => ({
    url: `${baseUrl}/representatives/${politician.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const constitutionRoutes: MetadataRoute.Sitemap = CONSTITUTION_CHAPTERS.map((chapter) => ({
    url: `${baseUrl}/constitution/${chapter.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...partyRoutes,
    ...politicianRoutes,
    ...constitutionRoutes,
  ];
}
