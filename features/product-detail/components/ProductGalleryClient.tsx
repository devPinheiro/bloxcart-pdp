"use client";

import {
  useCallback,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { Avatar } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { RarityStarBadgeIcon } from "@/shared/components/icons";
import { AvatarHero } from "@/shared/components/ui/avatar-hero";
import type { ProductRecord } from "@/shared/types/product";
import { cn } from "@/shared/lib/cn";

export interface ProductGalleryClientProps {
  product: ProductRecord;
  /** Server-rendered primary hero image (index 0) for LCP. */
  hero: ReactNode;
}

export function ProductGalleryClient({
  product,
  hero,
}: ProductGalleryClientProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = product.images[selectedIndex] ?? product.images[0];

  const selectIndex = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const onThumbKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectIndex((index + 1) % product.images.length);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectIndex((index - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <AvatarHero className="px-4">
        <Badge
          variant="rarity"
          className="absolute left-3 top-3 z-10 gap-[3px] rounded-lg bg-rarity py-1 pl-[5px] pr-2 text-white"
        >
          <RarityStarBadgeIcon size={14} />
          {product.rarity}
        </Badge>
        <Avatar
          size="hero"
          className="relative z-[1] w-full h-full  border-0 bg-transparent p-8"
        >
          {selectedIndex === 0 ? (
            hero
          ) : (
            <Avatar.Image
              key={selected.url}
              size="hero"
              src={selected.url}
              alt={selected.alt}
              data-testid="gallery-hero"
            />
          )}
        </Avatar>
      </AvatarHero>
      <ul className="flex gap-2" aria-label="Product thumbnails">
        {product.images.map((image, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li key={`${index}-${image.url}`}>
              <Button
                variant="thumb"
                pressed={isSelected}
                aria-label={image.alt}
                data-testid={`gallery-thumb-${index}`}
                onClick={() => selectIndex(index)}
                onKeyDown={(event) => onThumbKeyDown(event, index)}
                className={cn(!isSelected && "opacity-50")}
              >
                <Avatar.Image
                  size="thumb"
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  fetchPriority="low"
                  aria-hidden={!isSelected}
                  className="object-cover p-1"
                />
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
