import type { AppLocale } from '@/i18n/routing';
import Link from 'next/link';
import { T_REX_PRODUCT } from '@/features/product-detail/data/t-rex-product';
import { getTranslations } from 'next-intl/server';
import { productPath } from '@/features/product-detail/lib/product-urls';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('site');
  const loc = locale as AppLocale;
  const href = productPath(loc, T_REX_PRODUCT);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('name')}</h1>
      <p className="text-muted">{t('tagline')}</p>
      <Link href={href} className="inline-block text-accent hover:underline" aria-label={T_REX_PRODUCT.locales[loc].title}>
        {T_REX_PRODUCT.locales[loc].title}
      </Link>
    </div>
  );
}
