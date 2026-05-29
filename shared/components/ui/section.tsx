import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/shared/lib/cn';

export type SectionProps = ComponentProps<'section'>;

/** Vertical stack for a page or panel region. */
export function Section({ className, ...props }: SectionProps) {
  return <section className={cn('flex flex-col gap-6', className)} {...props} />;
}

export type SectionHeaderProps = ComponentProps<'header'>;

export function SectionHeader({ className, ...props }: SectionHeaderProps) {
  return <header className={className} {...props} />;
}

export interface SectionTitleProps extends ComponentProps<'h2'> {
  as?: ElementType;
  visuallyHidden?: boolean;
}

export function SectionTitle({
  as: Tag = 'h2',
  visuallyHidden = false,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        visuallyHidden ? 'sr-only' : 'text-lg font-semibold',
        className,
      )}
      {...props}
    />
  );
}

export type SectionBlockProps = ComponentProps<'div'>;

export function SectionBlock({ className, ...props }: SectionBlockProps) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />;
}

Section.Header = SectionHeader;
Section.Title = SectionTitle;
Section.Block = SectionBlock;
