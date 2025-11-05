import React, { type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { isElectron } from "@/utils/electron";
import { motion, type HTMLMotionProps } from "motion/react";

interface HeaderWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const HeaderWrapper = ({
  children,
  className,
  ...props
}: HeaderWrapperProps) => (
  <motion.div
    layout
    className={cn(
      "bg-accent/80 flex justify-center gap-2 min-h-[50px] items-center border-b",
      className
    )}
    initial={{
      opacity: 0,
      y: "-100%",
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: "-100%",
    }}
    transition={{
      duration: 0.3,
      ease: "easeInOut",
    }}
    style={{
      ...(isElectron()
        ? ({
            appRegion: "drag",
          } as CSSProperties)
        : {}),
    }}
    {...props}
  >
    {children}
  </motion.div>
);
export default HeaderWrapper;
