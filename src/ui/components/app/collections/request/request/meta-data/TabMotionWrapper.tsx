import type React from "react";
import { motion } from "framer-motion";

interface TabMotionWrapperProps {
  id: string;
  children: React.ReactNode;
}

const TabMotionWrapper = ({ children, id }: TabMotionWrapperProps) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-1 flex-col gap-3 relative"
    >
      {children}
    </motion.div>
  );
};

export default TabMotionWrapper;
