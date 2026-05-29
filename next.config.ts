import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // next/image serves AVIF/WebP variants via the built-in optimizer (Accept-header negotiation).
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
