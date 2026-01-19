import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Logo = ({ ...props }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_14_2)">
        <rect
          x="-39"
          y="-35"
          width="589"
          height="589"
          fill="var(--background)"
        />
        <path
          d="M191.19 364.083L50.5863 550H182.337L315.688 234.284L151.351 334.204L226.603 158.8L18 453.722L191.19 364.083Z"
          fill="var(--primary)"
        />
        <path
          d="M319.706 153.917L460.31 -32H328.559L195.208 283.716L359.545 183.796L284.293 359.2L492.896 64.2783L319.706 153.917Z"
          fill="var(--primary)"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_2">
          <rect width="512" height="512" rx="34" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
