import { ProductDetailSkeleton } from '@/features/product-detail/components/ProductDetailSkeleton';

function BackLinkSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mb-8 flex w-full items-center gap-2"
    >
      <div className="size-[25.6px] shrink-0 animate-pulse rounded-[6.4px] bg-surface-muted" />
      <div className="flex flex-1 items-center gap-2 lg:hidden">
        <div className="size-[25.6px] shrink-0 animate-pulse rounded-[6.4px] bg-surface-muted" />
        <div className="h-4 w-24 animate-pulse rounded bg-surface-muted" />
      </div>
      <div className="hidden h-4 w-28 animate-pulse rounded bg-surface-muted lg:block" />
    </div>
  );
}

export default function Loading() {
  return (
    <>
      <BackLinkSkeleton />
      <ProductDetailSkeleton />
    </>
  );
}
