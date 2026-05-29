import type { ComponentProps, ReactNode } from 'react';

import Image from 'next/image';
import { assets } from '@/shared/lib/assets';
import { cn } from '@/shared/lib/cn';

export interface AvatarHeroProps extends ComponentProps<'div'> {
  children: ReactNode;
}

/** Square hero frame with decorative dot pattern and rarity tint; renders arbitrary children. */
export function AvatarHero({ children, className, ...props }: AvatarHeroProps) {
  return (
    <div
      className={cn(
        'relative aspect-square w-full overflow-hidden rounded-[17px] border border-border bg-surface',
        className,
      )}
      {...props}
    >
      <Image
        src={assets.brand.heroDots}
        alt="avatar hero dots"
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        aria-hidden
        className="pointer-events-none object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-180 from-rarity/10 to-rarity/0"
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
