import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useRequestCodeSnippit } from "@/context/collections/request/meta-data/code/RequestCodeSnippitProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const RequestCodeLineWrapButton = () => {
  const { lineWrap, handleToggleLineWrap } = useRequestCodeSnippit();
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
          variant={"secondary"}
          onClick={handleToggleLineWrap}
        >
          Line {lineWrap ? "Unwrap" : "Wrap"}
        </Button>
      </TooltipTrigger>
      {Boolean(shortcutString) && (
        <TooltipContent side="bottom" variant={"secondary"}>
          <p>{shortcutString}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default RequestCodeLineWrapButton;
