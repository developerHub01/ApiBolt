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
} from "@/components/ui/tooltip-custom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
  Icon?: LucideIcon;
  align?: "center" | "end" | "start";
  side?: "bottom" | "top" | "right" | "left";
  children?: React.ReactNode;
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "iconSm" | "iconXs";
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "warningSecondary"
    | "destructiveSecondary"
    | "ghost"
    | "transparent";
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
    size = "default",
    variant = "secondary",
  }: CopyButtonProps & React.ComponentProps<"button">) => {
    const handleClick = async () => {
      try {
        await window.navigator.clipboard.writeText(value);
        toast("Copied Successfully");
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children ? (
            <span
              onClick={handleClick}
              className={cn("cursor-pointer", className)}
            >
              {children}
            </span>
          ) : (
            <Button
              variant={variant}
              onClick={handleClick}
              disabled={!value}
              className={className}
              size={size}
            >
              {Icon ? <Icon /> : <ClipboardCopyIcon />}
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} variant={"secondary"}>
          <p>{label || "Copy text"}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

export default CopyButton;
