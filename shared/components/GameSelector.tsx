'use client';

import type { CatalogGameLink } from '@/features/product-detail/lib/game-urls';
import { ChevronDownIcon } from '@/shared/components/icons';
import { Dropdown } from '@/shared/components/ui/dropdown';
import Image from 'next/image';
import { assets } from '@/shared/lib/assets';
import { cn } from '@/shared/lib/cn';
import { focusRing } from '@/shared/lib/focus-ring';
import { usePathname } from 'next/navigation';

export interface GameSelectorProps {
  games: CatalogGameLink[];
  label: string;
  className?: string;
  triggerClassName?: string;
}

/** game selector pill — opens a menu of catalog game links. */
export function GameSelector({
  games,
  label,
  className,
  triggerClassName,
}: GameSelectorProps) {
  const pathname = usePathname();

  if (games.length === 0) return null;

  const selected =
    games.find(({ game }) => pathname.includes(`/games/${game.slug}/`)) ??
    games.find(({ game }) => pathname.includes(`/games/${game.slug}`)) ??
    games[0];

  return (
    <Dropdown className={cn('shrink-0', className)} openOnHover>
      <Dropdown.Trigger
        aria-label={label}
        className={cn(
          'flex h-[45.6px] w-[179.2px] items-center justify-between gap-3 rounded-lg border border-transparent bg-surface-control p-2.5 text-left',
          triggerClassName,
          'transition-[background-color,border-color] duration-200 ease-out',
          'hover:border-border hover:bg-surface-muted',
          'data-[state=open]:border-accent-soft data-[state=open]:bg-surface-muted',
          focusRing,
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <Image
            src={assets.brand.gameIcon}
            alt=""
            width={26}
            height={26}
            className="size-[25.6px] shrink-0 rounded-[6.4px] object-cover"
            aria-hidden
          />
          <span className="truncate text-base font-medium tracking-[-0.16px] text-foreground transition-colors group-hover:text-foreground group-data-[state=open]:text-foreground">
            {selected.game.name}
          </span>
        </span>
        <ChevronDownIcon
          size={25.6}
          className={cn(
            'shrink-0 text-muted transition-transform duration-200 ease-out',
            'group-hover:rotate-90 group-hover:text-foreground',
            'group-data-[state=open]:rotate-90 group-data-[state=open]:text-foreground',
          )}
        />
      </Dropdown.Trigger>

      <Dropdown.Menu className="min-w-[179.2px]">
        {games.map(({ game, href }) => (
          <Dropdown.Link
            key={game.slug}
            href={href}
            selected={game.slug === selected.game.slug}
            aria-current={game.slug === selected.game.slug ? 'page' : undefined}
          >
            <Image
              src={assets.brand.gameIcon}
              alt=""
              width={26}
              height={26}
              className="size-[25.6px] shrink-0 rounded-[6.4px] object-cover"
              aria-hidden
            />
            <span className={cn(game.slug === selected.game.slug && 'text-accent-soft')}>
              {game.name}
            </span>
          </Dropdown.Link>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
