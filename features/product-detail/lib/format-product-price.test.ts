import { describe, expect, it } from 'vitest';
import {
  formatProductPrice,
  formatProductSavings,
  scalePricesByQuantity,
} from './format-product-price';

describe('format-product-price', () => {
  it('scales unit prices by quantity', () => {
    expect(scalePricesByQuantity(2, 21.5, 25.34)).toEqual({
      current: 43,
      original: 50.68,
      savings: 7.68,
    });
  });

  it('formats en-US USD totals', () => {
    const { current, original, savings } = scalePricesByQuantity(2, 21.5, 25.34);
    expect(formatProductPrice('en-US', current, 'USD')).toBe('$43.00');
    expect(formatProductPrice('en-US', original, 'USD')).toBe('$50.68');
    expect(formatProductSavings('en-US', savings, 'USD')).toBe('-$7.68');
  });

  it('formats es-ES EUR totals', () => {
    const { current, savings } = scalePricesByQuantity(2, 21.5, 25.34);
    expect(formatProductPrice('es-ES', current, 'EUR')).toBe('43,00 €');
    expect(formatProductSavings('es-ES', savings, 'EUR')).toBe('-7,68 €');
  });
});
