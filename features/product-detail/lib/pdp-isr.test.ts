import { describe, expect, it } from 'vitest';
import { PDP_ISR_REVALIDATE_SECONDS } from './pdp-isr';

describe('PDP ISR rendering strategy', () => {
  it('revalidates cached HTML every 60 seconds', () => {
    expect(PDP_ISR_REVALIDATE_SECONDS).toBe(60);
  });
});
