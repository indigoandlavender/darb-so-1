import { MetadataRoute } from 'next';
import { getQuestions } from '@/lib/questions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://derb.so';
  const questions = getQuestions();

  const questionUrls = questions.map((q) => ({
    url: `${baseUrl}/questions/${q.slug}`,
    lastModified: new Date(q.lastUpdated + '-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...questionUrls,
  ];
}
