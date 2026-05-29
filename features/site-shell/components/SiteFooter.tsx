import {
  FooterAccordionItem,
  FooterResourceLink,
} from './SiteFooterAccordion';

import type { AppLocale } from '@/i18n/routing';
import { HeadsetGlyphIcon } from '@/shared/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { LocaleSwitcher } from '@/shared/components/LocaleSwitcher';
import { SiteFooterSocial } from './SiteFooterSocial';
import { assets } from '@/shared/lib/assets';
import { getTranslations } from 'next-intl/server';

export interface SiteFooterProps {
  locale: string;
}

const FOOTER_RESOURCE_LINKS = [
  { id: 'blogs', href: '#' },
  { id: 'affiliates', href: '#' },
  { id: 'claimOrder', href: '#' },
  { id: 'tutorial', href: '#' },
] as const;

export async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations('footer');
  const appLocale = locale as AppLocale;

  return (
    <footer className="mt-16 border-t-2 border-border bg-surface-nav px-4 py-[52px] lg:hidden">
      <div className="mx-auto flex w-full max-w-[746px] flex-col gap-10">
        <section className="flex w-full flex-col items-center gap-8">
          <Link href={`/${locale}`} className="relative h-9 w-[162px] shrink-0">
            <Image
              src={assets.brand.logo}
              alt="BloxCart"
              width={162}
              height={36}
              className="size-full object-cover"
            />
          </Link>

          <p className="w-full text-center text-base font-medium leading-[1.4] tracking-[-0.32px] text-muted/40">
            {t('disclaimer')}
          </p>

          <LocaleSwitcher locale={appLocale} />
        </section>

        <section className="flex w-full flex-col gap-2" aria-label={t('linksAria')}>
          <FooterAccordionItem title={t('support')} />
          <FooterAccordionItem title={t('resources')} defaultOpen>
            {FOOTER_RESOURCE_LINKS.map(({ id, href }) => (
              <FooterResourceLink key={id} label={t(id)} href={href} />
            ))}
          </FooterAccordionItem>
          <FooterAccordionItem title={t('legal')} />
        </section>

        <section className="flex w-full flex-col items-center gap-[34px] pt-3 text-center">
          <h2 className="text-[25px] font-semibold leading-normal tracking-[-0.5px] text-foreground">
            {t('needHelpTitle')}
          </h2>
          <p className="whitespace-pre-line text-base font-medium leading-[1.4] tracking-[-0.32px] text-muted">
            {t('needHelpBody')}
          </p>
          <button
            type="button"
            className="inline-flex h-[45.6px] shrink-0 items-center gap-2 rounded-lg bg-support py-2.5 pl-2.5 pr-4 text-base font-medium leading-normal tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
          >
            <span className="flex size-[25.6px] shrink-0 items-center justify-center rounded-[6.4px] bg-white/20">
              <HeadsetGlyphIcon  />
            </span>
            {t('letsChat')}
          </button>
        </section>

        <div className="h-[2px] w-full bg-border" aria-hidden />

        <section className="flex w-full flex-col items-center gap-8">
          <p className="w-full text-center text-base font-medium leading-[1.4] tracking-[-0.32px] text-muted/40">
            {t('companyInfo')}
          </p>
          <SiteFooterSocial ariaLabel={t('socialAria')} />
        </section>
      </div>
    </footer>
  );
}
