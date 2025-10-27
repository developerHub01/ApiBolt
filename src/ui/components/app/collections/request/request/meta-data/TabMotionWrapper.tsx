import type React from "react";
import { motion } from "framer-motion";

interface TabMotionWrapperProps {
  children: React.ReactNode;
}

const TabMotionWrapper = ({ children }: TabMotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-1 flex-col gap-3 relative"
    >
      {children}
    </motion.div>
  );
};

export default TabMotionWrapper;
