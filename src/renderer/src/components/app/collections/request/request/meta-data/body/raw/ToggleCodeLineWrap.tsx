import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestBodyType } from "@/context/redux/request-response/selectors/body-raw";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const ToggleCodeLineWrap = memo(() => {
  const { codeLineWrap, handleToggleCodeLineWrap } = useRequestBody();
  const requestBodyType = useAppSelector(selectRequestBodyType);
  const shortcuts = useAppSelector(state =>
    selectApplyingKeyboardShortcutsById(state, "code_line_wrap"),
  );

  const shortcutString =
    Array.isArray(shortcuts) && shortcuts.length
      ? keyListStringify(shortcuts)
      : "";

  if (requestBodyType !== "raw") return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={handleToggleCodeLineWrap}
        >
          Line {codeLineWrap ? "Unwrap" : "Wrap"}
        </Button>
      </TooltipTrigger>
      {Boolean(shortcutString) && (
        <TooltipContent side="bottom" variant={"secondary"}>
          <p>{shortcutString}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
});
ToggleCodeLineWrap.displayName = "Toggle code line wrap";

export default ToggleCodeLineWrap;
