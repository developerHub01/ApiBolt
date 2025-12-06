import { memo, useEffect, useState } from "react";
import {
  ClipboardPaste as ClipboardPasteIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { cn } from "@/lib/utils";

interface PasteButtonProps {
  className?: string;
  label?: string;
  Icon?: LucideIcon;
  handleChange: (value: string) => void;
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

const PasteButton = memo(
  ({
    className = "",
    label,
    Icon,
    handleChange,
    children,
    align = "center",
    side = "bottom",
    size = "default",
    variant = "secondary",
  }: PasteButtonProps & React.ComponentProps<"button">) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const checkClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        setIsActive(Boolean(text));
      } catch (error) {
        console.error(error);
        setIsActive(false);
      }
    };

    useEffect(() => {
      checkClipboard();

      window.addEventListener("focus", checkClipboard);
      return () => window.removeEventListener("focus", checkClipboard);
    }, []);

    const handleClick = async () => {
      try {
        const value = await window.navigator.clipboard.readText();
        handleChange(value);
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
              disabled={!isActive}
              className={className}
              size={size}
            >
              {Icon ? <Icon /> : <ClipboardPasteIcon />}
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} variant={"secondary"}>
          <p>{label || "Paste copied"}</p>
        </TooltipContent>
      </Tooltip>
    );
  },
);

export default PasteButton;
