import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

const variantStyles = {
  pill: 'rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-muted',
  outline: 'rounded-md border border-border px-3 py-1 text-sm text-muted',
  success: 'text-sm font-medium text-success',
  danger: 'text-sm font-medium text-danger',
  rarity: cn(
    'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold',
    'bg-rarity text-white',
  ),
  savings: cn(
    'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-sm font-semibold',
    'bg-savings text-white',
  ),
  tag: cn(
    'rounded-md border border-border bg-surface px-3 py-1.5 text-sm opacity-40',
  ),
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant;
}

/** Inline label for tags, trust signals, or status text. */
export function Badge({ variant = 'pill', className, ...props }: BadgeProps) {
  return <span className={cn(variantStyles[variant], className)} {...props} />;
}
