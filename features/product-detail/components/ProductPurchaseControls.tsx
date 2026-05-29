'use client';

import { CartIcon, ChevronRightIcon } from '@/shared/components/icons';
import type { AppLocale } from '@/i18n/routing';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import {
  formatProductPrice,
  formatProductSavings,
  scalePricesByQuantity,
} from '@/features/product-detail/lib/format-product-price';
import { ProductPriceBlock } from './ProductPriceBlock';
import { ProductQuantityStepper } from './ProductQuantityStepper';

export interface ProductPurchaseControlsProps {
  locale: AppLocale;
  priceAmount: number;
  priceOriginalAmount: number;
  priceCurrency: string;
  ctaLabel: string;
  disabled?: boolean;
}

export function ProductPurchaseControls({
  locale,
  priceAmount,
  priceOriginalAmount,
  priceCurrency,
  ctaLabel,
  disabled = false,
}: ProductPurchaseControlsProps) {
  const [quantity, setQuantity] = useState(1);
  const { current, original, savings } = scalePricesByQuantity(
    quantity,
    priceAmount,
    priceOriginalAmount,
  );

  return (
    <>
      <ProductPriceBlock
        priceOriginal={formatProductPrice(locale, original, priceCurrency)}
        priceCurrent={formatProductPrice(locale, current, priceCurrency)}
        priceSavings={formatProductSavings(locale, savings, priceCurrency)}
      />

      <div className="flex gap-2">
        <ProductQuantityStepper
          quantity={quantity}
          onQuantityChange={setQuantity}
          disabled={disabled}
        />
        <Button
          variant="cta"
          disabled={disabled}
          className="flex h-[45.6px] max-w-full justify-between px-2.5"
        >
          <span className="flex w-full items-center gap-2 md:mr-6">
            <CartIcon size={25.6} />
            {ctaLabel}
          </span>
          {!disabled ? <ChevronRightIcon size={25.6} /> : null}
        </Button>
      </div>
    </>
  );
}
