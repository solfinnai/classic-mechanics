import type { MetadataRoute } from 'next';
import { mechanics } from '@/data/mechanics';
import { getStatesWithCounts } from '@/data/states';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://classicwrench.com';
  
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/mechanics`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Individual mechanic pages
  const mechanicRoutes = mechanics.map((mechanic) => ({
    url: `${baseUrl}/mechanics/${mechanic.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // State pages
  const states = getStatesWithCounts();
  const stateRoutes = states.map((state) => ({
    url: `${baseUrl}/states/${state.code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...mechanicRoutes, ...stateRoutes];
}