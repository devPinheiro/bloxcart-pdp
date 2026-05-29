"use client";

import { MinusIcon, PlusIcon } from "@/shared/components/icons";

import { Button } from "@/shared/components/ui/button";

export interface ProductQuantityStepperProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
}

export function ProductQuantityStepper({
  quantity,
  onQuantityChange,
  disabled = false,
}: ProductQuantityStepperProps) {
  return (
    <div
      className="inline-flex h-[45.6px] items-center justify-center rounded-lg bg-surface-control "
      data-testid="quantity-stepper"
    >
      <div className="flex  items-center gap-1">
        <Button
          variant="stepper"
          className="size-[25.6px] border-0 bg-transparent p-0 hover:bg-transparent"
          disabled={disabled || quantity <= 1}
          aria-label="Decrease quantity"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        >
          <MinusIcon size={25.6} />
        </Button>
        <span
          className="flex  px-2 items-center justify-center rounded-[6.4px] bg-accent text-base font-medium tabular-nums text-white"
          aria-live="polite"
        >
          {quantity}
        </span>
        <Button
          variant="stepper"
          className="size-[25.6px] border-0 bg-transparent p-0 hover:bg-transparent"
          disabled={disabled}
          aria-label="Increase quantity"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <PlusIcon size={25.6} />
        </Button>
      </div>
    </div>
  );
}
