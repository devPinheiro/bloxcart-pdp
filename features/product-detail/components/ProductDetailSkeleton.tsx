import { AvatarHero } from '@/shared/components/ui/avatar-hero';
import { cn } from '@/shared/lib/cn';

const THUMB_COUNT = 3;
const TAG_COUNT = 4;
const TRUST_CARD_COUNT = 3;
const META_ROW_COUNT = 5;
const DESCRIPTION_LINES = 5;

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded bg-surface-muted', className)}
      aria-hidden="true"
    />
  );
}

/** Placeholder layout matching Figma 746px two-row PDP to limit CLS during route loading. */
export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[746px]" aria-busy="true" data-testid="pdp-skeleton">
      <Skeleton className="mb-0 h-9 w-full lg:hidden" />
      <div className="mt-7 flex flex-col gap-8 lg:mt-0 lg:flex-row lg:justify-between">
        <div className="w-full lg:w-[360px] lg:shrink-0">
          <AvatarHero>
            <Skeleton className="h-full w-full rounded-none border-0" />
          </AvatarHero>
          <ul className="mt-3 flex gap-2" aria-hidden="true">
            {Array.from({ length: THUMB_COUNT }, (_, index) => (
              <li key={index}>
                <Skeleton className="h-[46px] w-[46px] rounded-lg" />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col gap-8 lg:w-[354px] lg:shrink-0">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="hidden items-center gap-2 lg:flex">
                <Skeleton className="size-[25.6px] rounded-[6.4px]" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="hidden h-9 w-full lg:block" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-16" />
              <div className="flex h-[30px] items-center gap-2.5">
                <Skeleton className="h-11 w-24" />
                <Skeleton className="h-9 w-20 rounded-[9px]" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-[45.6px] w-[112.67px] rounded-lg" />
              <Skeleton className="h-[45.6px] flex-1 rounded-lg" />
            </div>
          </div>
          <ul className="flex w-full gap-2" aria-hidden="true">
            {Array.from({ length: TRUST_CARD_COUNT }, (_, index) => (
              <li key={index} className="min-w-0 flex-1">
                <Skeleton className="h-24 rounded-xl" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full lg:w-[360px] lg:shrink-0">
          <Skeleton className="h-7 w-40" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: DESCRIPTION_LINES }, (_, index) => (
              <Skeleton
                key={index}
                className={cn('h-4', index === DESCRIPTION_LINES - 1 ? 'w-4/5' : 'w-full')}
              />
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
            {Array.from({ length: TAG_COUNT }, (_, index) => (
              <li key={index}>
                <Skeleton className="h-8 w-28 rounded-md" />
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-[354px] lg:shrink-0">
          {Array.from({ length: META_ROW_COUNT }, (_, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-border py-4 first:pt-0"
              style={index > 0 ? { borderTopWidth: 1 } : undefined}
            >
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
