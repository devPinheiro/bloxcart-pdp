import type { ProductAvailability, ProductRecord } from '@/shared/types/product';

import type { AppLocale } from '@/i18n/routing';
import { ProductAboutSection } from './ProductAboutSection';
import { ProductGallery } from './ProductGallery';
import { ProductJsonLd } from './ProductJsonLd';
import { ProductMetaTable } from './ProductMetaTable';
import { ProductPurchasePanel } from './ProductPurchasePanel';
import { getTranslations } from 'next-intl/server';

export interface ProductDetailViewProps {
  locale: AppLocale;
  product: ProductRecord;
  availability: ProductAvailability;
}


export async function ProductDetailView({
  locale,
  product,
  availability,
}: ProductDetailViewProps) {
  const t = await getTranslations('pdp');
  const content = product.locales[locale];

  return (
    <>
      <ProductJsonLd locale={locale} product={product} />
      <div className="w-full">
        <h1 className="font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.96px] text-foreground lg:hidden">
          {content.title}
        </h1>
        <div className="mt-7 flex flex-col gap-8 lg:mt-0 lg:flex-row lg:items-start lg:justify-between">
          <ProductGallery product={product} />
          <ProductPurchasePanel
            locale={locale}
            product={product}
            availability={availability}
          />
        </div>
        <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row lg:items-start lg:justify-between">
          <ProductAboutSection
            title={t('aboutItem')}
            description={content.description}
            tags={product.tags}
          />
          <ProductMetaTable
            product={product}
            labels={{
              category: t('meta.category'),
              rarity: t('meta.rarity'),
              game: t('meta.game'),
              delivery: t('meta.delivery'),
              condition: t('meta.condition'),
            }}
          />
        </div>
      </div>
    </>
  );
}
