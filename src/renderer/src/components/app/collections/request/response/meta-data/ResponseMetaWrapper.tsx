import type React from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"section"> {
  children: React.ReactNode;
}

const ResponseMetaWrapper = ({ children, className, ...props }: Props) => {
  return (
    <section
      className={cn(
        "flex justify-between items-center gap-2 px-2.5 min-h-10 border-b-2 border-border/5",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default ResponseMetaWrapper;
