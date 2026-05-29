import {
  HeadsetGlyphIcon,
  MenuIcon,
  OrderStatusIcon,
  SignInIcon,
} from "@/shared/components/icons";

import type { AppLocale } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";
import { GameSelector } from "../../../shared/components/GameSelector";
import Image from "next/image";
import Link from "next/link";
import { LocaleSwitcher } from "@/shared/components/LocaleSwitcher";
import type { ReactNode } from "react";
import { assets } from "@/shared/lib/assets";
import { cn } from "@/shared/lib/cn";
import { focusRing } from "@/shared/lib/focus-ring";
import { getCatalogGameLinks } from "@/features/product-detail/lib/game-urls";
import { getTranslations } from "next-intl/server";

export interface SiteHeaderProps {
  locale: string;
}

const navLinkClass =
  "group inline-flex items-center gap-2 rounded-lg px-1 py-2.5 text-base font-medium tracking-[-0.16px] text-foreground transition-colors duration-200 ease-out hover:text-accent-soft";

const headerLogos = [
  {
    src: assets.brand.logoMobile,
    width: 35,
    height: 32,
    className: "size-full object-contain object-left lg:hidden",
  },
  {
    src: assets.brand.logo,
    width: 163,
    height: 36,
    className: "hidden size-full object-cover lg:block",
  },
] as const;

function NavIconBadge({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span
      className={cn(
        "flex size-6 items-center justify-center rounded-sm transition-opacity duration-200 group-hover:opacity-90",
        className,
      )}
    >
      {children}
    </span>
  );
}

export async function SiteHeader({ locale }: SiteHeaderProps) {
  const t = await getTranslations("nav");
  const appLocale = locale as AppLocale;
  const gameLinks = getCatalogGameLinks(appLocale);

  const orderStatusLink = (
    <Link
      href={`/${locale}`}
      className={cn(navLinkClass, focusRing, "max-lg:w-full")}
    >
      <NavIconBadge className="bg-order">
        <OrderStatusIcon />
      </NavIconBadge>
      {t("orderStatus")}
    </Link>
  );

  const supportLink = (
    <Link
      href={`/${locale}`}
      className={cn(navLinkClass, focusRing, "max-lg:w-full")}
    >
      <NavIconBadge className="bg-support">
        <HeadsetGlyphIcon />
      </NavIconBadge>
      {t("support247")}
    </Link>
  );

  const signInButton = (
    <Button
      variant="signIn"
      type="button"
      className="max-lg:h-[45.6px] max-lg:w-full shrink-0 gap-2 py-2.5 pl-2.5 pr-4 lg:pl-3"
    >
      <SignInIcon size={25.6} />
      <span className="text-base font-medium tracking-[-0.16px]">
        {t("signIn")}
      </span>
    </Button>
  );

  return (
    <header className="relative isolate border-b border-border bg-surface-nav py-4 lg:py-5">
      <div className="pointer-events-none absolute -left-28 top-[-71px] z-[1] h-[220px] w-[201px] lg:left-0 lg:top-[-69px]">
        <Image
          src={assets.brand.dots}
          alt=""
          width={163}
          height={36}
          priority
          aria-hidden
          className="size-full"
        />
      </div>

      <nav
        role="navigation"
        aria-label="top"
        className="relative z-[3] flex w-full items-center gap-4 px-4 lg:justify-between lg:gap-6 lg:px-6 xl:px-[240px]"
      >
        <div className="flex w-full justify-start gap-4 lg:gap-6">
          <Link
            href={`/${locale}`}
            className={cn(
              "relative h-8 w-[34.667px] shrink-0 rounded-lg lg:h-9 lg:w-[163px]",
              focusRing,
            )}
          >
            {headerLogos.map(({ src, width, height, className }) => (
              <Image
                key={src}
                src={src}
                alt="BloxCart"
                width={width}
                height={height}
                priority
                className={className}
              />
            ))}
          </Link>

          <GameSelector
            games={gameLinks}
            label={t("selectGame")}
            className="min-w-0 flex-1 lg:shrink-0 lg:flex-none"
            triggerClassName="w-full min-w-0 lg:w-[179.2px]"
          />

          <div className="hidden items-center gap-5 lg:flex">
            {orderStatusLink}
            {supportLink}
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LocaleSwitcher locale={appLocale} />
          {signInButton}
        </div>

        <details className="group relative shrink-0 lg:hidden">
          <summary
            aria-label={t("openMenu")}
            className={cn(
              "flex size-[45px] cursor-pointer list-none items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-control",
              focusRing,
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <MenuIcon size={45} />
          </summary>

          <div
            className={cn(
              "absolute right-0 top-[calc(100%+8px)] z-100 hidden w-[min(100vw-2rem,280px)]",
              "rounded-lg border border-border bg-surface-nav p-4 shadow-lg group-open:block",
            )}
          >
            <div className="flex flex-col gap-1">
              {orderStatusLink}
              {supportLink}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <LocaleSwitcher locale={appLocale} />
              {signInButton}
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
