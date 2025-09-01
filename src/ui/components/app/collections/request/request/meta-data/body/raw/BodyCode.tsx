import { memo, useCallback, useEffect, useState } from "react";
import { formatCode, getParser } from "@/utils/prettierUtils";
import { toast } from "sonner";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import Code from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import type { TContentType } from "@/types/request-response.types";
import { cn } from "@/lib/utils";
import {
  selectRawData,
  selectRawRequestBodyType,
} from "@/context/redux/request-response/request-response-selector";

const codeFormatter = async (
  rawRequestBodyType: TContentType,
  code: string,
  callback: (code: string) => void
) => {
  const parser = getParser(rawRequestBodyType);
  const { success, data, message } = await formatCode(code, parser);
  if (!code) return;
  if (!success || !data) return message && toast(message);
  callback(data);
};

const bodyTypeLabel = (type: TContentType) =>
  type === "html"
    ? "HTML"
    : type === "xml"
      ? "XML"
      : type === "json"
        ? "JSON"
        : type === "javascript"
          ? "JavaScript"
          : "TEXT";

const placeholderLabel = (type: TContentType) =>
  `Write you raw body data in ${bodyTypeLabel(type)}`;

const BodyCode = memo(() => {
  const { handleChangeRawData, codeLineWrap } = useRequestBody();
  const rawData = useAppSelector(selectRawData);
  const rawRequestBodyType = useAppSelector(selectRawRequestBodyType);
  const [code, setCode] = useState<string>(rawData);

  const handleFormat = useCallback(
    () => codeFormatter(rawRequestBodyType, code, setCode),
    [rawRequestBodyType, code]
  );

  useEffect(() => {
    setCode(rawData);
  }, [rawData]);

  const handleChange = useCallback((value: string) => setCode(value), []);

  const handleBlur = useCallback(
    () => handleChangeRawData(code),
    [code, handleChangeRawData]
  );

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full relative bg-background/10 rounded-md border",
        "backdrop-blur-xs"
      )}
    >
      <Code
        code={code}
        contentType={rawRequestBodyType}
        onChange={handleChange}
        onBlur={handleBlur}
        zoomable={true}
        lineWrap={codeLineWrap}
        handleFormat={handleFormat}
        placeholder={placeholderLabel(rawRequestBodyType)}
        className="static"
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

BodyCode.displayName = "Request data code area";

export default BodyCode;
