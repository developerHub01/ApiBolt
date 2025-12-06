import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  className?: string;
  block?: "start" | "end" | "center" | "nearest";
  children: React.ReactNode;
}

const AutoScrollActiveWrapper = memo(
  ({ className = "", block = "center", children }: Props) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      requestAnimationFrame(() => {
        const activeTab = scrollAreaRef.current?.querySelector(
          '[data-active="true"]',
        );
        if (!activeTab) return;

        activeTab.scrollIntoView({
          behavior: "smooth",
          block,
        });
      });
    }, [block]);

    return (
      <motion.div
        className={cn("w-full flex flex-col", className)}
        ref={scrollAreaRef}
      >
        {children}
      </motion.div>
    );
  },
);

export default AutoScrollActiveWrapper;
