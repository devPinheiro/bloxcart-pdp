import type { ComponentProps } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';

const sizeStyles = {
  thumb: 'h-[46px] w-[46px]',
} as const;

const defaultDimensions = {
  thumb: { width: 46, height: 46 },
} as const;

/** Default `sizes` for fluid hero images inside a square gallery frame. */
export const AVATAR_HERO_IMAGE_SIZES = '(max-width: 1024px) 100vw, 260px';

export type AvatarSize = 'hero' | 'thumb';

export interface AvatarProps extends ComponentProps<'div'> {
  size?: AvatarSize;
}

/** Framed container for product or profile imagery. */
export function Avatar({ size = 'hero', className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'overflow-hidden',
        size === 'hero' && 'rounded-[17px] border border-border bg-surface-elevated',
        size === 'thumb' && 'rounded-lg',
        className,
      )}
      {...props}
    />
  );
}

export interface AvatarImageProps extends Omit<ComponentProps<typeof Image>, 'width' | 'height'> {
  size?: AvatarSize;
  width?: number;
  height?: number;
  alt: string;
}

/** Next.js Image preset for Avatar sizes (hero / thumb). */
export function AvatarImage({
  size = 'hero',
  className,
  width,
  height,
  alt,
  sizes,
  ...props
}: AvatarImageProps) {
  if (size === 'hero') {
    return (
      <Image
        alt={alt}
        fill
        sizes={sizes ?? AVATAR_HERO_IMAGE_SIZES}
        className={cn('object-contain relative', className)}
        {...props}
      />
    );
  }

  const dimensions = defaultDimensions.thumb;

  return (
    <Image
      alt={alt}
      width={width ?? dimensions.width}
      height={height ?? dimensions.height}
      className={cn('object-cover', sizeStyles.thumb, className)}
      {...props}
    />
  );
}

Avatar.Image = AvatarImage;
