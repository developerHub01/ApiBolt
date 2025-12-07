import { useState, type ComponentProps } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface BaseProps {
  fallback?: string;
  isAnimated?: boolean;
  src?: string;
  className?: string;
  id?: string;
}

// Props type: either normal img props or motion img props
type Props = BaseProps & (ComponentProps<"img"> | HTMLMotionProps<"img">);

const ImageWithFallback = ({
  id,
  className,
  src = "",
  fallback,
  isAnimated = false,
  ...props
}: Props) => {
  const defaultImage = fallback || "./images/image_placeholder.png";
  const [srcState, setSrcState] = useState(src || defaultImage);

  const handleError = () => {
    if (srcState === defaultImage) return;
    setSrcState(defaultImage);
  };

  const commonProps = {
    id,
    src: srcState,
    className,
    onError: handleError,
    ...props,
  };

  if (isAnimated)
    return <motion.img {...(commonProps as HTMLMotionProps<"img">)} />;

  return <img {...(commonProps as ComponentProps<"img">)} />;
};

export default ImageWithFallback;
