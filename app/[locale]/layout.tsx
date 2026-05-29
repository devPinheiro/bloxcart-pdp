import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { routing, type AppLocale } from '@/i18n/routing';
import { SiteFooter } from '@/features/site-shell/components/SiteFooter';
import { SiteHeader } from '@/features/site-shell/components/SiteHeader';
import { fontBody, fontDisplay } from '@/shared/lib/fonts';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="bg-background font-body text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <SiteHeader locale={locale} />
          <main className="mx-auto max-w-[746px] px-4 py-8">{children}</main>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
