import { Badge } from '@/shared/components/ui/badge';
import { SavingsFlameIcon } from '@/shared/components/icons';

export interface ProductPriceBlockProps {
  priceOriginal: string;
  priceCurrent: string;
  priceSavings: string;
}

export function ProductPriceBlock({
  priceOriginal,
  priceCurrent,
  priceSavings,
}: ProductPriceBlockProps) {
  return (
    <div className="flex flex-col gap-4" data-testid="price-block">
      <p className="text-base font-medium tracking-[-0.16px] text-foreground/50 line-through">
        {priceOriginal}
      </p>
      <div className="flex h-[30px] items-center gap-2.5">
        <p
          className="text-[44px] font-semibold leading-normal tracking-[-0.88px] text-foreground"
          data-testid="price-current"
        >
          {priceCurrent}
        </p>
        <Badge
          variant="savings"
          className="h-9 gap-[4.5px] rounded-[9px] bg-savings py-1.5 pl-[7.5px] pr-[9px] text-lg font-medium tracking-[-0.36px] text-white"
        >
          <SavingsFlameIcon size={21} />
          {priceSavings}
        </Badge>
      </div>
    </div>
  );
}
