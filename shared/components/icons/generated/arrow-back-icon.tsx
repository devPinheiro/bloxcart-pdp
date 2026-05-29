import { IconProps } from "@/shared/types/icon";

export function ArrowBackIcon({
  size = 26,
  title,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25.6 25.6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g id="Frame 1948757140">
        <rect
          width="25.6"
          height="25.6"
          rx="6.4"
          fill="var(--fill-0, #383350)"
        />
        <g id="Vector" opacity="0.5">
          <path
            d="M11.6739 17.653C11.2909 18.036 10.6701 18.036 10.2872 17.653C9.90427 17.2701 9.90427 16.6493 10.2872 16.2664L13.7539 12.7997C14.5197 12.0339 15.7614 12.0339 16.5272 12.7997L11.6739 17.653Z"
            fill="var(--fill-0, white)"
          />
          <path
            d="M10.2872 9.33303C9.90427 8.95012 9.90427 8.32928 10.2872 7.94637C10.6701 7.56345 11.2909 7.56345 11.6739 7.94637L16.5272 12.7997C15.7614 13.5655 14.5197 13.5655 13.7539 12.7997L10.2872 9.33303Z"
            fill="var(--fill-0, white)"
          />
        </g>
      </g>
    </svg>
  );
}
