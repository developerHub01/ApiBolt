import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import { formatCode, getParser } from "@/utils/prettier.utils";
import { useAppSelector } from "@/context/redux/hooks";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const BeautifyCode = memo(() => {
  const { handleChangeRawData } = useRequestBody();
  const requestBodyType = useAppSelector(selectRequestBodyType);
  const rawRequestBodyType = useAppSelector(selectRawRequestBodyType);
  const code = useAppSelector(selectRawData);
  const shortcuts = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "code_beautify")
  );

  const shortcutString =
    Array.isArray(shortcuts) && shortcuts.length
      ? keyListStringify(shortcuts)
      : "";

  const parser = useMemo(
    () => getParser(rawRequestBodyType),
    [rawRequestBodyType]
  );

  const handleClick = useCallback(async () => {
    const { success, data, message } = await formatCode(code, parser);

    if (!success || !data) return message && toast(message);

    handleChangeRawData(data);
  }, [code, parser, handleChangeRawData]);

  if (requestBodyType !== "raw" || rawRequestBodyType === "text") return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"sm"} variant={"secondary"} onClick={handleClick}>
            Beautify
          </Button>
        </TooltipTrigger>
        {Boolean(shortcutString) && (
          <TooltipContent side="bottom" align="end" variant={"secondary"}>
            <p>{shortcutString}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
});

BeautifyCode.displayName = "BautifyCode";

export default BeautifyCode;
