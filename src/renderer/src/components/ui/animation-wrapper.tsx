import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface Props {
  children: React.ReactNode;
}

const AnimationWrapper = ({
  children,
  ...props
}: HTMLMotionProps<"div"> & Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "linear",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
