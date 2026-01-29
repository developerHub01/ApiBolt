import { SVGProps, useMemo } from "react";

type TMutedColors =
  | "background"
  | "foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "border"
  | "input"
  | "ring"
  | "line";

interface Props extends Omit<SVGProps<SVGSVGElement>, "color"> {
  color?: TMutedColors;
}

const Logo = ({ color = "primary", ...props }: Props) => {
  const primaryColor = useMemo(() => `var(--${color})`, [color]);

  return (
    <svg
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_24_7)">
        <rect
          x="-78"
          y="-70"
          width="1178"
          height="1178"
          fill="var(--background)"
        />
        <path
          d="M416 668.042L206.544 945H402.811L601.463 474.68L356.652 623.53L468.754 362.233L158 801.575L416 668.042Z"
          fill={primaryColor}
        />
        <path
          d="M607.449 354.958L816.905 78H620.637L421.986 548.32L666.797 399.47L554.695 660.767L865.449 221.425L607.449 354.958Z"
          fill={primaryColor}
        />
      </g>
      <rect
        x="40"
        y="40"
        width="944"
        height="944"
        rx="155"
        stroke={primaryColor}
        strokeWidth="80"
      />
      <defs>
        <clipPath id="clip0_24_7">
          <rect width="1024" height="1024" rx="195" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
