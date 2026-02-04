import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { X as CloseIcon } from "lucide-react";
import { cn } from "@renderer/lib/utils";

interface Props extends ComponentProps<"button"> {}

const TabCloseButton = ({ className, ...props }: Props) => {
  return (
    <Button
      size={"iconXs"}
      variant={"secondary"}
      className={cn(
        "h-5 w-5 absolute top-1/2 -translate-y-1/2 right-1.5 opacity-0 group-hover:opacity-100",
        className,
      )}
      {...props}
    >
      <CloseIcon size={14} />
    </Button>
  );
};

export default TabCloseButton;
