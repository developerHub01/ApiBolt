import {
  Expand as FullScreenIcon,
  Minimize as SmallScreenIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { Button } from "@/components/ui/button";
import { useGlobal } from "@/context/global/GlobalProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const FullScreenToggle = () => {
  const { isFullscreen, toggleFullscreen } = useGlobal();
  const shortcut = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "toggle_fullscreen")
  );

  const shortCutString =
    Array.isArray(shortcut) && shortcut.length
      ? ` (${keyListStringify(shortcut)})`
      : "";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"background"}
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
      <TooltipContent side="right" variant={"secondary"}>
        <p>
          {isFullscreen
            ? `Toggle Full Screen${shortCutString}`
            : `Enter Full Screen${shortCutString}`}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FullScreenToggle;
