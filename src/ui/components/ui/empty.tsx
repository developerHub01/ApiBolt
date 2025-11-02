import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import AnimationWrapper from "@/components/ui/animation-wrapper";
import BorderedWrapper from "@/components/ui/bordered-wrapper";

interface EmptyProps {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
  icon?: React.ReactNode;
  animationSrc?: string;
  showFallback?: boolean;
  centered?: boolean;
  [key: string]: unknown;
}

const Empty = ({
  label = "Nothing here yet!",
  description,
  children,
  className = "",
  fallbackClassName = "",
  icon,
  animationSrc = "./lottie/empty-box.lottie",
  showFallback = false,
  centered = true,
  ...props
}: EmptyProps) => {
  return (
    <BorderedWrapper
      className={cn(
        centered && "flex flex-col justify-center items-center text-center",
        className
      )}
      {...props}
    >
      {icon && <div className="mb-2">{icon}</div>}

      <AnimatePresence>
        {showFallback && (
          <AnimationWrapper
            className={cn(
              "w-32 mb-2 flex justify-center items-center [&_canvas]:object-contain!",
              fallbackClassName
            )}
          >
            <DotLottieReact src={animationSrc} loop autoplay width={"100%"} />
          </AnimationWrapper>
        )}
      </AnimatePresence>

      <div className="mx-auto w-full max-w-md">
        {label && <h4 className="font-medium">{label}</h4>}

        {description && (
          <p className="text-sm text-muted-foreground/80">{description}</p>
        )}
      </div>

      {children && <div className="mt-2">{children}</div>}
    </BorderedWrapper>
  );
};

export default Empty;
