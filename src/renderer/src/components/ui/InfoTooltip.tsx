import React, { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { Info as InfoIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  Icon?: LucideIcon;
  label: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
  align?: ComponentProps<typeof TooltipContent>["align"];
  size?: ComponentProps<typeof Button>["size"];
  buttonVariant?: ComponentProps<typeof Button>["variant"];
  contentVariant?: ComponentProps<typeof TooltipContent>["variant"];
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

const InfoTooltip = ({
  Icon = InfoIcon,
  label,
  size = "iconXs",
  side = "bottom",
  align = "center",
  buttonVariant = "secondary",
  contentVariant = "secondary",
  className = "",
  contentClassName = "",
  children,
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={buttonVariant} size={size} className={cn(className)}>
          {children ? children : <Icon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        variant={contentVariant}
        className={cn(contentClassName)}
      >
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default InfoTooltip;
