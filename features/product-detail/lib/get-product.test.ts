import { describe, expect, it, vi, afterEach } from 'vitest';
import { getProductBySlug, resolveAvailability, resolveStockQuantity } from './get-product';
import { T_REX_PRODUCT } from '../data/t-rex-product';

const GAME = T_REX_PRODUCT.game.slug;

describe('getProductBySlug', () => {
  it('resolves en-US slug', () => {
    expect(getProductBySlug('en-US', GAME, T_REX_PRODUCT.slugs['en-US'])).toEqual(T_REX_PRODUCT);
  });

  it('resolves es-ES slug', () => {
    expect(getProductBySlug('es-ES', GAME, T_REX_PRODUCT.slugs['es-ES'])).toEqual(T_REX_PRODUCT);
  });

  it('returns null for unknown slug', () => {
    expect(getProductBySlug('en-US', GAME, 'unknown')).toBeNull();
  });

  it('returns null for wrong game', () => {
    expect(getProductBySlug('en-US', 'wrong-game', T_REX_PRODUCT.slugs['en-US'])).toBeNull();
  });
});

describe('resolveAvailability', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('forces out of stock when SHOW_OOS=true', () => {
    vi.stubEnv('SHOW_OOS', 'true');
    expect(resolveAvailability(T_REX_PRODUCT)).toBe('OutOfStock');
  });
});

describe('resolveStockQuantity', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns brief quantity when in stock', () => {
    expect(resolveStockQuantity(T_REX_PRODUCT)).toBe(47);
  });

  it('returns 0 when SHOW_OOS=true', () => {
    vi.stubEnv('SHOW_OOS', 'true');
    expect(resolveStockQuantity(T_REX_PRODUCT)).toBe(0);
  });
});
