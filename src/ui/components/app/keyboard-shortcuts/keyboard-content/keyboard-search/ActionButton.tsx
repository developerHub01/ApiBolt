import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import type { LucideIcon } from "lucide-react";

interface Props {
  id: string;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

const ActionButton = ({
  id,
  label,
  Icon,
  onClick,
  isActive = false,
}: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"iconXs"}
          variant={isActive ? "default" : "secondary"}
          type="button"
          title={label}
          id={`search_${id}`}
          onClick={onClick}
          tabIndex={-1}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end" variant={"secondary"}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ActionButton;
