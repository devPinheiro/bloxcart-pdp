import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en-US', 'es-ES'],
  defaultLocale: 'en-US',
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];
