import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useResponse } from "@/context/collections/request/ResponseProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const BodyTopCodeWrap = () => {
  const { responseCodeWrap, handleToggleResponseCodeWrap } = useResponse();
  const shortcuts = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "code_line_wrap")
  );

  const shortcutString =
    Array.isArray(shortcuts) && shortcuts.length
      ? keyListStringify(shortcuts)
      : "";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={handleToggleResponseCodeWrap}
        >
          {responseCodeWrap ? "Unwrap" : "Wrap"}
        </Button>
      </TooltipTrigger>
      {shortcutString && (
        <TooltipContent variant={"secondary"} side="bottom">
          <p>{shortcutString}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
BodyTopCodeWrap.displayName = "Body top code wrap";

export default BodyTopCodeWrap;
