import localFont from 'next/font/local';
import { Manrope } from 'next/font/google';

export const fontDisplay = Manrope({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-display',
});

export const fontBody = localFont({
  src: [
    {
      path: '../../public/fonts/mail-sans-roman/MailSansRoman-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/mail-sans-roman/MailSansRoman-DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
});
