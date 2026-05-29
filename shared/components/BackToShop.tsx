import { ArrowBackIcon } from './icons/generated/arrow-back-icon';
import { getCatalogGameLinks } from '@/features/product-detail/lib/game-urls';
import type { AppLocale } from '@/i18n/routing';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/shared/lib/assets';
import { cn } from '@/shared/lib/cn';
import { focusRing } from '@/shared/lib/focus-ring';
import { getTranslations } from 'next-intl/server';

export interface BackToShopProps {
  locale: string;
  gameSlug: string;
  gameName: string;
}

export async function BackToShop({
  locale,
  gameSlug,
  gameName,
}: BackToShopProps) {
  const t = await getTranslations('nav');
  const appLocale = locale as AppLocale;
  const shopHref =
    getCatalogGameLinks(appLocale).find((link) => link.game.slug === gameSlug)
      ?.href ?? `/${locale}`;

  const backIcon = (
    <span className={cn('-scale-y-100 inline-flex rotate-180')}>
      <ArrowBackIcon size={25.6} />
    </span>
  );

  return (
    <div className="mb-8 flex w-full items-center gap-2">
      <Link
        href={shopHref}
        aria-label={t('backToShop')}
        className={cn(
          'inline-flex shrink-0 items-center transition-opacity hover:opacity-80',
          focusRing,
          'lg:gap-2 lg:text-base lg:font-medium lg:leading-normal lg:tracking-[-0.16px]',
          'lg:text-foreground/50 lg:hover:text-foreground',
        )}
      >
        {backIcon}
        <span className="hidden lg:inline">{t('backToShop')}</span>
      </Link>

      <div
        className="flex min-w-0 flex-1 items-center gap-2 lg:hidden"
        aria-hidden
      >
        <Image
          src={assets.brand.gameIcon}
          alt=""
          width={26}
          height={26}
          className="size-[25.6px] shrink-0 rounded-[6.4px] object-cover"
        />
        <p className="truncate text-base font-medium leading-normal tracking-[-0.16px] text-foreground">
          {gameName}
        </p>
      </div>
    </div>
  );
}
