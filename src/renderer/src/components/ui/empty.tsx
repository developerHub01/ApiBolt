import React from "react";
import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import AnimationWrapper from "@/components/ui/animation-wrapper";
import BorderedWrapper from "@/components/ui/bordered-wrapper";
import animationData from "@/assets/lottie/empty-box.json";

interface EmptyProps {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  fallbackClassName?: string;
  icon?: React.ReactNode;
  animationData?: unknown; // renamed to match Lottie
  showFallback?: boolean;
  centered?: boolean;
  innerClassName?: string;
}

const Empty: React.FC<EmptyProps> = ({
  label = "No data available",
  description,
  children,
  className = "",
  fallbackClassName = "",
  icon,
  animationData: animData = animationData, // default local animation
  showFallback = false,
  centered = true,
  innerClassName = "",
}) => {
  return (
    <BorderedWrapper
      className={cn(
        centered && "flex flex-col justify-center items-center text-center",
        className,
      )}
    >
      {icon && <div className="mb-2">{icon}</div>}

      <AnimatePresence>
        {showFallback && (
          <AnimationWrapper
            className={cn(
              "w-32 mb-2 flex justify-center items-center [&_canvas]:object-contain!",
              fallbackClassName,
            )}
          >
            <Lottie animationData={animData} loop autoplay width="100%" />
          </AnimationWrapper>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "mx-auto w-full max-w-md flex flex-col gap-2",
          innerClassName,
        )}
      >
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
