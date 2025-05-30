import { useFullScreen } from "@/hooks/use-full-screen";
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
import { isElectron } from "@/utils/electron";

const FullScreenToggle = () => {
  const { isFullscreen, toggleFullscreen } = useFullScreen();

  if (isElectron()) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={toggleFullscreen} size="icon">
          {isFullscreen ? (
            <SmallScreenIcon size={18} />
          ) : (
            <FullScreenIcon size={18} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FullScreenToggle;
