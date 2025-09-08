import { Button } from "@/components/ui/button";
import { ChevronUp as ArrowIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useRequestResponse } from "@/context/collections/request/RequestResponseProvider";
import { handleToggleCollapse } from "@/context/redux/request-response/request-response-slice";
import { selectIsResponseCollapsed } from "@/context/redux/request-response/request-response-selector";

const ResponsCollapseButton = () => {
  const dispatch = useAppDispatch();
  const { handleForceCollapse } = useRequestResponse();
  const isResponseCollapsed = useAppSelector(selectIsResponseCollapsed);

  const handleCollapseClick = () => {
    handleForceCollapse(true);
    dispatch(handleToggleCollapse());
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"iconSm"}
            variant={"ghost"}
            onClick={handleCollapseClick}
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
