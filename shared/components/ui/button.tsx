'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';
import { focusRing } from '@/shared/lib/focus-ring';

const variantStyles = {
  primary: cn(
    'rounded-lg px-6 py-3 text-base font-semibold',
    'bg-accent text-white shadow-glow',
    'hover:bg-accent-hover',
    'disabled:bg-surface-muted disabled:text-muted disabled:shadow-none',
  ),
  cta: cn(
    'h-[46px] gap-2 rounded-lg text-base font-semibold tracking-[-0.01em]',
    'bg-accent text-white shadow-glow',
    'hover:bg-accent-hover',
    'disabled:bg-surface-muted disabled:text-muted disabled:shadow-none',
  ),
  signIn: cn(
    'h-10 gap-2 rounded-lg px-4 text-sm font-semibold tracking-[-0.01em]',
    'bg-accent text-white',
    'hover:bg-accent-hover',
  ),
  stepper: cn(
    'h-[46px] w-[46px] rounded-lg bg-surface-control text-foreground',
    'hover:bg-surface-muted',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  thumb: 'h-[46px] w-[46px] overflow-hidden rounded-lg border-2 p-0',
} as const;

export type ButtonVariant = keyof typeof variantStyles;

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  /** Toggle state for thumb (and future toggle) variants — sets aria-pressed. */
  pressed?: boolean;
}

/** Accessible button with shared focus/hover styles. */
export function Button({
  variant = 'primary',
  fullWidth = false,
  pressed,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      className={cn(
        'inline-flex items-center justify-center transition',
        focusRing,
        'disabled:cursor-not-allowed',
        variantStyles[variant],
        variant === 'thumb' &&
          (pressed ? 'border-accent' : 'border-border hover:border-accent-soft'),
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    />
  );
}
