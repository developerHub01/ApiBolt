import {
  Expand as FullScreenIcon,
  Minimize as SmallScreenIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useGlobal } from "@/context/global/GlobalProvider";

const FullScreenToggle = () => {
  const { isFullscreen, toggleFullscreen } = useGlobal();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          onClick={() => toggleFullscreen()}
          size="icon"
        >
          {isFullscreen ? (
            <SmallScreenIcon size={18} />
          ) : (
            <FullScreenIcon size={18} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>
          {isFullscreen ? "Exit Full Screen (F11)" : "Enter Full Screen (F11)"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FullScreenToggle;
