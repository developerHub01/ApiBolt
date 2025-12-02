import { useState, type ComponentProps } from "react";

interface Props extends ComponentProps<"img"> {
  fallback?: string;
}

const DEFAULT_PLACEHOLDER_URL = "./images/image_placeholder.png";

const ImageWithFallback = ({
  id,
  className,
  src = "",
  fallback,
  ...props
}: Props) => {
  const defaultImage = fallback ?? DEFAULT_PLACEHOLDER_URL;
  const [srcState, setSrcState] = useState<string>(src || defaultImage);

  const handleError = () => {
    if (srcState === defaultImage) return;
    setSrcState(defaultImage);
  };

  return (
    <img
      id={id}
      src={srcState}
      {...props}
      className={className}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
