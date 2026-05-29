"use client";

import { FlagEurGlyphIcon, FlagUsdGlyphIcon } from "@/shared/components/icons";

import type { AppLocale } from "@/i18n/routing";
import type { ComponentType } from "react";
import Link from "next/link";
import { T_REX_PRODUCT } from "@/features/product-detail/data/t-rex-product";
import { cn } from '@/shared/lib/cn';
import { focusRing } from '@/shared/lib/focus-ring';
import { productPath } from "@/features/product-detail/lib/product-urls";
import { usePathname } from 'next/navigation';

const LOCALES: AppLocale[] = ["en-US", "es-ES"];

const localeLabels: Record<AppLocale, string> = {
  "en-US": "USD",
  "es-ES": "EUR",
};

const localeFlags: Record<AppLocale, ComponentType<{ size?: number }>> = {
  "en-US": FlagUsdGlyphIcon,
  "es-ES": FlagEurGlyphIcon,
};

export function LocaleSwitcher({
  locale,
  className,
}: {
  locale: AppLocale;
  className?: string;
}) {
  const pathname = usePathname();
  const isPdp = /\/games\/[^/]+\/[^/]+$/.test(pathname);
  const activeLocale = LOCALES.find((loc) => loc === locale) ?? "en-US";
  const alternate = LOCALES.find((loc) => loc !== locale);
  const FlagIcon = localeFlags[activeLocale];

  if (!alternate) {
    return null;
  }

  const href = isPdp ? productPath(alternate, T_REX_PRODUCT) : `/${alternate}`;

  return (
    <Link
      href={href}
      hrefLang={alternate}
      className={cn(
        'flex h-[45.6px] shrink-0 items-center justify-center rounded-lg bg-surface-control px-3 py-2.5 transition-colors hover:bg-black/10',
        focusRing,
        className,
      )}
      aria-label={`Switch currency to ${localeLabels[alternate]}`}
    >
      <span className="flex items-center gap-2">
        <FlagIcon size={25.6}/>
        <span className="text-base font-medium tracking-[-0.16px] text-foreground whitespace-nowrap">
          {localeLabels[activeLocale]}
        </span>
      </span>
    </Link>
  );
}
