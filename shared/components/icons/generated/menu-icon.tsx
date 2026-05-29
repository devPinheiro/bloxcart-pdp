import { IconProps } from "@/shared/types/icon";

export function MenuIcon({ size = 26, title, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      className={className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect width="45" height="45" rx="8" fill="white" fillOpacity="0.08"/>
  <path d="M13 16.5H32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  <path d="M13 22.5H32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  <path d="M13 28.5H32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
