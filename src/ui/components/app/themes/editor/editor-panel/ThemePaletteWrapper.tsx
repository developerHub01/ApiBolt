import React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "motion/react";

interface Props extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
}

const ThemePaletteWrapper = ({ children, className = "", ...props }: Props) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0)",
      }}
      exit={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      className={cn("w-full h-full grid grid-cols-1 md:grid-cols-2", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default ThemePaletteWrapper;
