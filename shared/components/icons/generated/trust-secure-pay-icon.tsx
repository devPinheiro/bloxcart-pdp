import { IconProps } from "@/shared/types/icon";

export function TrustSecurePayIcon({ size = 26, title, className =  "rotate-90", ...props }: IconProps) {
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
      <g id="Frame 1948757166">
<rect width="25.6" height="25.6" rx="6.4" fill="var(--fill-0, #837BAB)" fillOpacity="0.2"/>
<path id="Vector" d="M15.9429 4.94286C17.2447 4.94286 18.3 5.99819 18.3 7.3L18.3 18.3C18.3 19.6018 17.2447 20.6571 15.9429 20.6571L11.9161 20.6571L11.9161 4.94286L15.9429 4.94286ZM14.6661 17.7107C14.6661 18.0362 14.9299 18.3 15.2554 18.3C15.5808 18.3 15.8446 18.0362 15.8446 17.7107L15.8446 15.7464C15.8446 15.421 15.5808 15.1571 15.2554 15.1571C14.9299 15.1571 14.6661 15.421 14.6661 15.7464L14.6661 17.7107ZM7.3 7.3C7.3 5.99819 8.35533 4.94286 9.65714 4.94286L10.7375 4.94286L10.7375 20.6571L9.65714 20.6571C8.35533 20.6571 7.3 19.6018 7.3 18.3L7.3 7.3Z" fill="var(--fill-0, white)"/>
</g>
    </svg>
  );
}
