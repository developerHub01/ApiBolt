import { Button } from "@/components/ui/button";
import { ChevronUp as ArrowIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useAppSelector } from "@/context/redux/hooks";
import { useRequestResponse } from "@/context/collections/request/RequestResponseProvider";
import { selectIsResponseCollapsed } from "@/context/redux/request-response/selectors/response";
import { useResponse } from "@/context/collections/request/ResponseProvider";

const ResponsCollapseButton = () => {
  const { handleCollapse } = useRequestResponse();
  const { responsePanelToggleShortcut } = useResponse();
  const isResponseCollapsed = useAppSelector(selectIsResponseCollapsed);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"iconSm"} variant={"ghost"} onClick={handleCollapse}>
            <ArrowIcon
              className={cn("transition-transform duration-500 ease-in-out", {
                "rotate-0": isResponseCollapsed,
                "-rotate-180": !isResponseCollapsed,
              })}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" variant={"secondary"}>
          <p>
            {isResponseCollapsed ? "Expend" : "Collaps"} Response Panel
            {responsePanelToggleShortcut
              ? ` (${responsePanelToggleShortcut})`
              : ""}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResponsCollapseButton;
