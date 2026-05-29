import type {
  ProductAvailability,
  ProductRecord,
} from "@/shared/types/product";

import type { AppLocale } from "@/i18n/routing";
import Image from "next/image";
import { ProductPurchaseControls } from "./ProductPurchaseControls";
import { ProductTrustCards } from "./ProductTrustCards";
import { assets } from "@/shared/lib/assets";
import { getTranslations } from "next-intl/server";

export interface ProductPurchasePanelProps {
  locale: AppLocale;
  product: ProductRecord;
  availability: ProductAvailability;
}

export async function ProductPurchasePanel({
  locale,
  product,
  availability,
}: ProductPurchasePanelProps) {
  const t = await getTranslations("pdp");
  const content = product.locales[locale];
  const outOfStock = availability === "OutOfStock";

  return (
    <section className="flex w-full flex-col gap-8 lg:w-[354px] lg:shrink-0">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="hidden items-center gap-2 lg:flex">
            <Image
              src={assets.brand.gameIcon}
              alt="game icon"
              width={26}
              height={26}
              className="size-[25.6px] shrink-0 rounded-[6.4px] object-cover"
              aria-hidden
            />
            <p className="text-base font-medium tracking-[-0.16px] text-foreground">
              {product.game.name}
            </p>
          </div>
          <h1 className="hidden font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.96px] text-foreground lg:block">
            {content.title}
          </h1>
        </div>

        <ProductPurchaseControls
          locale={locale}
          priceAmount={content.priceAmount}
          priceOriginalAmount={content.priceOriginalAmount}
          priceCurrency={content.priceCurrency}
          ctaLabel={outOfStock ? t("outOfStock") : content.ctaLabel}
          disabled={outOfStock}
        />
      </div>

      <ProductTrustCards badges={content.trustBadges} />
    </section>
  );
}
