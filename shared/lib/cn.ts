import clsx, { type ClassValue } from 'clsx';

/** Merge conditional class names (Tailwind-friendly). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
