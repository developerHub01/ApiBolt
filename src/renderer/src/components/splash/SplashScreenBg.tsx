import React from "react";
import { motion } from "motion/react";

interface Props {
  children: React.ReactNode;
}

const SplashScreenBg = ({ children }: Props) => {
  return (
    <>
      {/* Subtle Light Effects */}
      <motion.div
        className="absolute top-6 right-6 w-1 h-1 bg-foreground/40 rounded-full"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-10 right-10 w-0.5 h-0.5 bg-primary/30 rounded-full"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-1 h-1 bg-primary/20 rounded-full"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-8 left-10 w-1 h-1 bg-secondary/20 rounded-full"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      {children}
      {/* Professional corner accents */}
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-3 right-3 w-1 h-1 bg-secondary-foreground/20 rounded-full" />
        <div className="absolute top-5 right-5 w-0.5 h-0.5 bg-secondary-foreground/15 rounded-full" />
      </div>

      <div className="absolute bottom-0 left-0 w-6 h-6">
        <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-secondary-foreground/15 rounded-full" />
      </div>
    </>
  );
};

export default SplashScreenBg;
