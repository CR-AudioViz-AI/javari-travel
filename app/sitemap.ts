// app/sitemap.ts — the pages this app wants indexed
//
// 2026-08-16: this app had no sitemap, so discovery depended on a crawler
// finding an internal link. Generated rather than static, so it cannot drift
// out of date as pages are added.
import type { MetadataRoute } from 'next'

const BASE = 'https://travel.craudiovizai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${BASE}`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/alerts`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/deals`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/predictions`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]
}
