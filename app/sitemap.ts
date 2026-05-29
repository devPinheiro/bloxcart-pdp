import { getSiteUrl } from '@/shared/lib/site-url';
import { buildAppSitemap } from '@/shared/lib/build-sitemap';

export default function sitemap() {
  return buildAppSitemap(getSiteUrl());
}
