import React from "react";
import { HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const LocalPasswordScreenWrapper = ({
  children,
  className,
  ...props
}: Props) => {
  return (
    <motion.div
      initial={{
        x: "100%",
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: "-100%",
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
        ease: "linear",
      }}
      className={cn(
        "w-full h-full flex flex-col justify-center items-center gap-4 p-2",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default LocalPasswordScreenWrapper;
