/** Base URL for canonical links and sitemap (no trailing slash). */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return url.replace(/\/$/, '');
}
