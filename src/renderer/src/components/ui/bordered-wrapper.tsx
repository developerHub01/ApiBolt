import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const BorderedWrapper = ({
  className,
  children,
  ...props
}: Props & ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-full h-full min-h-24 border-2 border-dashed p-4 rounded-md text-muted-foreground select-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BorderedWrapper;
