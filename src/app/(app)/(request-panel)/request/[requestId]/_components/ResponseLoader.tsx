"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const ResponseLoader = () => {
  const { isLoading } = useRequestResponse();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="relative w-full h-1.5 bg-foreground/5"
          key="response-loader"
          exit={{ opacity: 0, height: 0 }}
        >
          <span className="absolute top-0 left-0 h-full w-16 rounded-full animate-loader-v1 bg-primary/80"></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseLoader;
