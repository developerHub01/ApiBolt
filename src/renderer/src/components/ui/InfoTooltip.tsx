import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { Info as InfoIcon, LucideIcon } from "lucide-react";

interface Props {
  Icon?: LucideIcon;
  label: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
  align?: ComponentProps<typeof TooltipContent>["align"];
  size?: ComponentProps<typeof Button>["size"];
  buttonVariant?: ComponentProps<typeof Button>["variant"];
  contentVariant?: ComponentProps<typeof TooltipContent>["variant"];
}

const InfoTooltip = ({
  Icon = InfoIcon,
  label,
  size = "iconXs",
  side = "bottom",
  align = "center",
  buttonVariant = "secondary",
  contentVariant = "secondary",
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={buttonVariant} size={size}>
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align} variant={contentVariant}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default InfoTooltip;
