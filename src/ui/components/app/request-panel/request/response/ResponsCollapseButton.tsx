import { Button } from "@/components/ui/button";
import { ChevronUp as ArrowIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

const ResponsCollapseButton = () => {
  const { isResponseCollapsed, handleToggleCollapse } = useRequestResponse();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"iconSm"}
            variant={"ghost"}
            onClick={() => handleToggleCollapse()}
          >
            <ArrowIcon
              className={cn("transition-transform duration-500 ease-in-out", {
                "rotate-0": isResponseCollapsed,
                "-rotate-180": !isResponseCollapsed,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p>{isResponseCollapsed ? "Expend" : "Collaps"} Response Panel</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResponsCollapseButton;
