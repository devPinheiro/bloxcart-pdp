import { Avatar } from '@/shared/components/ui/avatar';
import type { ProductImage } from '@/shared/types/product';

export interface ProductGalleryHeroProps {
  image: ProductImage;
}

/** SSR LCP hero — priority image in initial HTML (not blocked by client hydration). */
export function ProductGalleryHero({ image }: ProductGalleryHeroProps) {
  return (
    <Avatar.Image
      size="hero"
      src={image.url}
      alt={image.alt}
      priority
      fetchPriority="high"
      data-testid="gallery-hero"
    />
  );
}
