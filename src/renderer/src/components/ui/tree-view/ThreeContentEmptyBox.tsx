import { ComponentProps, memo } from "react";
import Empty from "@/components/ui/empty";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  title: string;
  description: string;
}

const ThreeContentEmptyBox = memo(
  ({ title, description, className = "", ...props }: Props) => (
    <div className={cn("w-full h-full p-2")} {...props}>
      <Empty label={title} description={description} showFallback />
    </div>
  ),
);

export default ThreeContentEmptyBox;
