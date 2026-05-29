import type { ProductRecord } from '@/shared/types/product';
import { ProductGalleryClient } from './ProductGalleryClient';
import { ProductGalleryHero } from './ProductGalleryHero';

export interface ProductGalleryProps {
  product: ProductRecord;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const primaryImage = product.images[0];
  if (!primaryImage) return null;

  return (
    <ProductGalleryClient
      product={product}
      hero={<ProductGalleryHero image={primaryImage} />}
    />
  );
}
