import { memo, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

interface Props extends HTMLMotionProps<"div"> {
  className?: string;
  block?: "start" | "end" | "center" | "nearest";
  children: React.ReactNode;
  scrollDependency?: unknown | Array<unknown>;
}

const AutoScrollActiveWrapper = memo(
  ({
    className = "",
    block = "center",
    children,
    scrollDependency,
    ...props
  }: Props) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const lastDepsRef = useRef<string | null>(null);

    const memoDeps = useMemo(() => {
      if (Array.isArray(scrollDependency))
        return JSON.stringify(scrollDependency);
      if (scrollDependency) return JSON.stringify([scrollDependency]);
      return null;
    }, [scrollDependency]);

    useEffect(() => {
      if (memoDeps === lastDepsRef.current) return;
      lastDepsRef.current = memoDeps;

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
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

export default AutoScrollActiveWrapper;
