import { ComponentProps, memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {}

const EnvironmentVariableListWrapper = memo(
  ({ children, className = "", ...props }: Props) => {
    return (
      <ScrollArea
        className={cn(
          "w-full min-h-0 h-full [&>div>div]:h-full rounded-lg border",
          className,
        )}
      >
        <div
          className="w-full h-full flex flex-col items-center gap-5"
          {...props}
        >
          {children}
        </div>
      </ScrollArea>
    );
  },
);

export default EnvironmentVariableListWrapper;
