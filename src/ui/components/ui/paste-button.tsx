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

interface PasteButtonProps {
  className?: string;
  label?: string;
  Icon?: LucideIcon;
  handleChange: (value: string) => void;
  children?: React.ReactNode;
}

const PasteButton = memo(
  ({
    className = "",
    label,
    Icon,
    handleChange,
    children,
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
            <span onClick={handleClick}>{children}</span>
          ) : (
            <Button
              variant={"secondary"}
              onClick={handleClick}
              disabled={!isActive}
              className={className}
            >
              {Icon ? <Icon /> : <ClipboardPasteIcon />}
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent side="bottom" variant={"secondary"}>
          <p>{label || "Paste copied"}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

export default PasteButton;
