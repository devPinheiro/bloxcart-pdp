import type { AppLocale } from '@/i18n/routing';

function roundMoney(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/** Format a line-total amount using locale-specific display conventions from the brief. */
export function formatProductPrice(
  locale: AppLocale,
  amount: number,
  currency: string,
): string {
  const value = roundMoney(amount);

  if (locale === 'es-ES') {
    const formatted = value.toFixed(2).replace('.', ',');
    return currency === 'EUR' ? `${formatted} €` : formatted;
  }

  return currency === 'USD' ? `$${value.toFixed(2)}` : `$${value.toFixed(2)}`;
}

/** Format savings as a negative delta (e.g. `-$3.84` or `-3,84 €`). */
export function formatProductSavings(
  locale: AppLocale,
  savingsAmount: number,
  currency: string,
): string {
  const value = roundMoney(Math.abs(savingsAmount));

  if (locale === 'es-ES') {
    const formatted = value.toFixed(2).replace('.', ',');
    return currency === 'EUR' ? `-${formatted} €` : `-${formatted}`;
  }

  return `-$${value.toFixed(2)}`;
}

export function scalePricesByQuantity(
  quantity: number,
  unitCurrent: number,
  unitOriginal: number,
) {
  const qty = Math.max(1, quantity);
  const current = roundMoney(unitCurrent * qty);
  const original = roundMoney(unitOriginal * qty);
  const savings = roundMoney((unitOriginal - unitCurrent) * qty);

  return { current, original, savings };
}
