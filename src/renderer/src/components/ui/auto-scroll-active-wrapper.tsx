import { memo, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  className?: string;
  block?: "start" | "end" | "center" | "nearest";
  children: React.ReactNode;
  scrollDependency?: unknown | Array<unknown>;
}

const AutoScrollActiveWrapper = memo(
  ({ className = "", block = "center", children, scrollDependency }: Props) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const memoDeps = useMemo(() => {
      if (Array.isArray(scrollDependency)) return scrollDependency;
      if (scrollDependency) return [scrollDependency];
      return [];
    }, [scrollDependency]);

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
    }, [block, memoDeps]);

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
