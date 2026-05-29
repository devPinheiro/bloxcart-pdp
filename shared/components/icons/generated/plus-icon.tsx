import { IconProps } from "@/shared/types/icon";

export function PlusIcon({ size = 26, title, className, ...props }: IconProps) {
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
      <g id="plus">
<rect width="25.6" height="25.6" rx="6.4" fill="var(--fill-0, #837BAB)" fillOpacity="0.2"/>
<g id="plus_2">
<path d="M6.79941 12.8C6.79941 12.2477 7.24713 11.8 7.79941 11.8L17.7994 11.8C18.3517 11.8 18.7994 12.2477 18.7994 12.8C18.7994 13.3523 18.3517 13.8 17.7994 13.8L7.79941 13.8C7.24713 13.8 6.79941 13.3523 6.79941 12.8Z" fill="var(--fill-0, white)"/>
<path d="M12.7994 6.8C13.3517 6.8 13.7994 7.24771 13.7994 7.8L13.7994 17.8C13.7994 18.3523 13.3517 18.8 12.7994 18.8C12.2471 18.8 11.7994 18.3523 11.7994 17.8L11.7994 7.8C11.7994 7.24771 12.2471 6.8 12.7994 6.8Z" fill="var(--fill-0, white)"/>
</g>
</g>
    </svg>
  );
}
