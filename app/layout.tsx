import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getSiteUrl } from '@/shared/lib/site-url';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

/** Root layout — locale-specific shell lives under app/[locale]. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
