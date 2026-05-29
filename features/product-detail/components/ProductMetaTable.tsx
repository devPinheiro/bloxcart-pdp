import type { ReactNode } from 'react';
import { LightningDeliveryIcon, RarityStarMetaIcon } from '@/shared/components/icons';
import { cn } from '@/shared/lib/cn';
import type { ProductRecord } from '@/shared/types/product';

export interface ProductMetaTableProps {
  product: ProductRecord;
  labels: {
    category: string;
    rarity: string;
    game: string;
    delivery: string;
    condition: string;
  };
}

type MetaRow = {
  key: string;
  label: string;
  value: ReactNode;
};

export function ProductMetaTable({ product, labels }: ProductMetaTableProps) {
  const rows: MetaRow[] = [
    { key: 'category', label: labels.category, value: product.category },
    {
      key: 'rarity',
      label: labels.rarity,
      value: (
        <span className="inline-flex items-center gap-1 text-[#309ce3]">
          <RarityStarMetaIcon size={14} />
          {product.rarity}
        </span>
      ),
    },
    { key: 'game', label: labels.game, value: product.game.name },
    {
      key: 'delivery',
      label: labels.delivery,
      value: (
        <span className="inline-flex items-center gap-1">
          <LightningDeliveryIcon size={14} />
          {product.delivery}
        </span>
      ),
    },
    { key: 'condition', label: labels.condition, value: product.condition },
  ];

  return (
    <dl
      className="w-full rounded-xl border border-border bg-surface px-2.5 py-6 lg:w-[354px] lg:shrink-0"
      data-testid="meta-table"
    >
      {rows.map((row, index) => (
        <div
          key={row.key}
          className={cn(
            'flex items-center justify-between gap-4 text-sm font-medium leading-normal tracking-[-0.14px]',
            index > 0 && 'mt-4 border-t border-border pt-4',
          )}
        >
          <dt className="text-foreground/70">{row.label}</dt>
          <dd className="text-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
