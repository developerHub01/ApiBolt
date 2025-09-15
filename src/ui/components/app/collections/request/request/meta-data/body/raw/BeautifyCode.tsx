import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { useAppSelector } from "@/context/redux/hooks";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";

const BeautifyCode = memo(() => {
  const { handleChangeRawData } = useRequestBody();
  const requestBodyType = useAppSelector(selectRequestBodyType);
  const rawRequestBodyType = useAppSelector(selectRawRequestBodyType);
  const code = useAppSelector(selectRawData);

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
        <TooltipContent side="bottom" align="end">
          <p>Alt + Shift + F</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

BeautifyCode.displayName = "BautifyCode";

export default BeautifyCode;
