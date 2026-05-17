import { ComponentProps, memo } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {}

const TreeBottomAction = memo(
  ({ children, className = "", ...props }: Props) => {
    return (
      <div
        className={cn(
          "flex items-center justify-end gap-1.5 px-2 py-1.5 border-t-2",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export default TreeBottomAction;
