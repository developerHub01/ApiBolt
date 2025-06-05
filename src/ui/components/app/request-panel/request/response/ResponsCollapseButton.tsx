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
import { handleToggleCollapse } from "@/context/redux/request-response/request-response-slice";

const ResponsCollapseButton = () => {
  const dispatch = useAppDispatch();
  const isResponseCollapsed = useAppSelector(
    (state) =>
      state.requestResponse.isResponseCollapsed[state.requestResponse.selectedTab!]
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"iconSm"}
            variant={"ghost"}
            onClick={() => dispatch(handleToggleCollapse())}
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
