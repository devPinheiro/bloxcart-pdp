import { IconProps } from "@/shared/types/icon";

export function FlagEurGlyphIcon({
  size = 26,
  title,
  className = "rounded-sm",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40.0008 26.6676"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g id="Group">
        <path
          id="Vector"
          d="M0 0H40.0008V6.6669H0V0Z"
          fill="var(--fill-0, #AA151B)"
        />
        <path
          id="Vector_2"
          d="M0 6.6669H40.0008V20.0007H0V6.6669Z"
          fill="var(--fill-0, #F1BF00)"
        />
        <path
          id="Vector_3"
          d="M0 20.0007H40.0008V26.6676H0V20.0007Z"
          fill="var(--fill-0, #AA151B)"
        />
      </g>
    </svg>
  );
}
