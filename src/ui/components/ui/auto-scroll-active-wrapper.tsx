import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  block?: "start" | "end" | "center" | "nearest";
  children: React.ReactNode;
}

const AutoScrollActiveWrapper = ({
  className = "",
  block = "center",
  children,
}: Props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      const activeTab = scrollAreaRef.current?.querySelector(
        '[data-active="true"]'
      );
      if (!activeTab) return;

      activeTab.scrollIntoView({
        behavior: "smooth",
        block,
      });
    });
  }, [block]);

  return (
    <div
      className={cn("w-full flex flex-col gap-1", className)}
      ref={scrollAreaRef}
    >
      {children}
    </div>
  );
};

export default AutoScrollActiveWrapper;
