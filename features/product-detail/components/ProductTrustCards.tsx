import {
  TrustFastDeliveryIcon,
  TrustSecurePayIcon,
  TrustSupportIcon,
} from '@/shared/components/icons';

export interface ProductTrustCardsProps {
  badges: string[];
}

const iconForBadge = (badge: string) => {
  const normalized = badge.toLowerCase();
  if (normalized.includes('delivery') || normalized.includes('envío')) {
    return TrustFastDeliveryIcon;
  }
  if (normalized.includes('support') || normalized.includes('soporte')) {
    return TrustSupportIcon;
  }
  return TrustSecurePayIcon;
};

export function ProductTrustCards({ badges }: ProductTrustCardsProps) {
  return (
    <ul className="flex w-full gap-2" data-testid="trust-cards">
      {badges.map((badge) => {
        const Icon = iconForBadge(badge);
        return (
          <li
            key={badge}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface px-2.5 py-5 text-center text-base font-medium tracking-[-0.16px] text-foreground"
          >
            <Icon size={25.6} />
            <span className="truncate">{badge}</span>
          </li>
        );
      })}
    </ul>
  );
}
