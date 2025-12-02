import { memo } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const RequestListItemContentWrapperParent = memo(
  ({
    className = "",
    children,
    ...props
  }: Props & React.ComponentProps<"div">) => {
    return (
      <div
        className={cn(
          "w-full cursor-pointer hover:bg-accent/50 focus-within:bg-accent/50 duration-100 transition-all px-2 border-x-2 h-9 border-transparent",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default RequestListItemContentWrapperParent;
