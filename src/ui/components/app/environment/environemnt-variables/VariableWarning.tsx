import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TriangleAlert as WarningIcon } from "lucide-react";

const VariableWarning = memo(() => {
  return (
    <Tooltip open>
      <TooltipTrigger asChild>
        <Button variant="secondary" size={"iconXs"} className="rounded-full">
          <WarningIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className="w-52 p-2 bg-accent [&>span>svg]:bg-accent [&>span>svg]:fill-accent text-accent-foreground"
        side="bottom"
        align="end"
        alignOffset={5}
      >
        <p>This variable has been overwritten by a duplicate variable.</p>
      </TooltipContent>
    </Tooltip>
  );
});

export default VariableWarning;
