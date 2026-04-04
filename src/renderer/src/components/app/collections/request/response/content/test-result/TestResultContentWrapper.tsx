import { ComponentProps, memo } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {}

const TestResultContentWrapper = memo(
  ({ className, children, ...props }: Props) => {
    return (
      <div
        className={cn(
          "flex flex-col divide-y divide-border/50 relative",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export default TestResultContentWrapper;
