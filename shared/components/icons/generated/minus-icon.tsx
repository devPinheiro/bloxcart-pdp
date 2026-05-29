import { IconProps } from "@/shared/types/icon";

export function MinusIcon({ size = 26, title, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25.6 25.6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      className={className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g id="minus">
<rect width="25.6" height="25.6" rx="6.4" fill="var(--fill-0, #837BAB)" fillOpacity="0.1"/>
<path id="minus_2" opacity="0.5" d="M6.8 12.8C6.8 12.2477 7.24771 11.8 7.8 11.8H17.8C18.3523 11.8 18.8 12.2477 18.8 12.8C18.8 13.3523 18.3523 13.8 17.8 13.8H7.8C7.24771 13.8 6.8 13.3523 6.8 12.8Z" fill="var(--fill-0, white)"/>
</g>
    </svg>
  );
}
