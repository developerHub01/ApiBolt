import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

interface EmptyProps {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
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
  icon,
  animationSrc = "./lottie/empty-box.lottie",
  showFallback = false,
  centered = true,
  ...props
}: EmptyProps) => {
  return (
    <div
      className={cn(
        "w-full h-full min-h-24 border-2 border-dashed p-4 rounded-md text-muted-foreground select-none",
        centered && "flex flex-col justify-center items-center text-center",
        className
      )}
      {...props}
    >
      {icon && <div className="mb-2">{icon}</div>}

      {showFallback && (
        <div className="w-32 h-32 mb-2">
          <DotLottieReact src={animationSrc} loop autoplay />
        </div>
      )}

      {label && <h4 className="font-medium">{label}</h4>}

      {description && (
        <p className="text-sm text-muted-foreground/80">{description}</p>
      )}

      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default Empty;
