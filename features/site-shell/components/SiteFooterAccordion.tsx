import { ChevronDownIcon } from '@/shared/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { assets } from '@/shared/lib/assets';
import { cn } from '@/shared/lib/cn';
import { focusRing } from '@/shared/lib/focus-ring';

export interface FooterAccordionItemProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export function FooterAccordionItem({
  title,
  children,
  defaultOpen = false,
}: FooterAccordionItemProps) {
  const hasPanel = Boolean(children);

  return (
    <details
      className="group w-full rounded-lg bg-surface-control"
      open={defaultOpen || undefined}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between p-2.5 text-base font-medium leading-normal tracking-[-0.32px] text-foreground',
          focusRing,
          '[&::-webkit-details-marker]:hidden',
        )}
      >
        {title}
        <ChevronDownIcon
          size={25.6}
          className={cn(
            'shrink-0 transition-transform duration-200',
            'rotate-90 group-open:-rotate-90 group-open:scale-y-[-1]',
          )}
          aria-hidden
        />
      </summary>
      {hasPanel ? (
        <div
          className={cn(
            'hidden flex-col gap-5 px-2.5 pb-5 pr-[7px] group-open:flex',
            'group-open:mt-5',
          )}
        >
          {children}
        </div>
      ) : null}
    </details>
  );
}

export interface FooterResourceLinkProps {
  label: string;
  href: string;
}

export function FooterResourceLink({ label, href }: FooterResourceLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-between pr-3 text-base font-medium leading-normal tracking-[-0.32px] text-muted transition-colors hover:text-foreground',
        focusRing,
      )}
    >
      {label}
      <Image
        src={assets.brand.externalLink}
        alt="External link icon"
        width={12}
        height={12}
        aria-hidden
        className="size-3 shrink-0 opacity-40"
      />
    </Link>
  );
}
