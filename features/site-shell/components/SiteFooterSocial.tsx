import Image from 'next/image';
import { assets } from '@/shared/lib/assets';

const SOCIAL_LINKS = [
  { label: 'Discord', href: 'https://discord.com', icon: assets.brand.socialDiscord },
  { label: 'YouTube', href: 'https://youtube.com', icon: assets.brand.socialYoutube },
  { label: 'X', href: 'https://x.com', icon: assets.brand.socialX },
  { label: 'TikTok', href: 'https://tiktok.com', icon: assets.brand.socialTiktok },
] as const;

export interface SiteFooterSocialProps {
  ariaLabel: string;
}

export function SiteFooterSocial({ ariaLabel }: SiteFooterSocialProps) {
  return (
    <ul className="flex items-center gap-2" aria-label={ariaLabel}>
      {SOCIAL_LINKS.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-8 items-center justify-center rounded-[6px] bg-surface-control px-1.5 py-[5px] transition-opacity hover:opacity-80"
          >
            <Image src={icon} alt="social icon" width={18} height={18} className="max-h-[18px] w-auto object-contain" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
