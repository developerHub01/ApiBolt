import { memo } from "react";
import type {
  BottomActionButtonInterface,
  ListBottomActionType,
} from "@shared/types/request-list";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";

interface ActionButtonProps extends BottomActionButtonInterface {
  onClick?: (id: ListBottomActionType) => void;
}

const ActionButton = memo(({ id, label, Icon, onClick }: ActionButtonProps) => {
  return (
    <Tooltip key={id}>
      <TooltipTrigger asChild>
        <button
          title={label}
          onClick={() => onClick && onClick(id)}
          className="cursor-pointer p-1 rounded-md aspect-square bg-accent/5 hover:bg-accent transition-all duration-100"
        >
          <Icon size={16} />
        </button>
      </TooltipTrigger>
      <TooltipContent className="p-1" variant={"secondary"}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
});

export default ActionButton;
