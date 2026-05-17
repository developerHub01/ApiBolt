import { ComponentProps, memo } from "react";
import { cn } from "@/lib/utils";
import ProjectName from "@/components/ui/ProjectName";

interface Props extends ComponentProps<"div"> {
  showTitle?: boolean;
  title?: string;
}

const TreeTopAction = memo(
  ({ showTitle = false, title, children, className = "", ...props }: Props) => {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-1 px-2 py-1.5 border-b-2",
          className,
        )}
        {...props}
      >
        {showTitle && <ProjectName title={title} />}
        {children}
      </div>
    );
  },
);

export default TreeTopAction;
