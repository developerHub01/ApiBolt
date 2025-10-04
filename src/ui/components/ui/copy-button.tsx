import React, { memo } from "react";
import {
  ClipboardCopy as ClipboardCopyIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
  Icon?: LucideIcon;
  align?: "center" | "end" | "start";
  side?: "bottom" | "top" | "right" | "left";
  children?: React.ReactNode;
}

const CopyButton = memo(
  ({
    value,
    className = "",
    label,
    Icon,
    children,
    align = "center",
    side = "bottom",
  }: CopyButtonProps & React.ComponentProps<"button">) => {
    const handleClick = async () => {
      try {
        await window.navigator.clipboard.writeText(value);
        toast("Successfully coppied");
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children ? (
            <span onClick={handleClick}>{children}</span>
          ) : (
            <Button
              variant={"secondary"}
              onClick={handleClick}
              disabled={!value}
              className={className}
            >
              {Icon ? <Icon /> : <ClipboardCopyIcon />}
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>{label || "Copy text"}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

export default CopyButton;
