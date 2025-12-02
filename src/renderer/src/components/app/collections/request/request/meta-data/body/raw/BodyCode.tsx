import { memo, useCallback, useEffect, useState } from "react";
import { formatCode, getParser } from "@/utils/prettier.utils";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import Code from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import type { TContentType } from "@shared/types/request-response.types";
import { cn } from "@/lib/utils";
import {
  selectRawData,
  selectRawRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";
import { codeFormatter } from "@/utils/code";
import useCheckApplyingCodeIndentationSize from "@/hooks/setting/use-check-applying-code-indentation-size";
import ErrorAlert1 from "@/components/ui/error-alert1";

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
  const { handleChangeRawData, codeLineWrap, handleToggleCodeLineWrap } =
    useRequestBody();
  const rawData = useAppSelector(selectRawData);
  const rawRequestBodyType = useAppSelector(selectRawRequestBodyType);
  const indentationSize = useCheckApplyingCodeIndentationSize();
  const [code, setCode] = useState<string>(rawData);
  const [isError, setIsError] = useState<boolean>(false);

  const handleFormat = useCallback(
    async () =>
      await codeFormatter({
        rawRequestBodyType,
        code,
        callback: setCode,
        showErrorToast: true,
      }),
    [rawRequestBodyType, code]
  );

  useEffect(() => {
    setCode(rawData);
  }, [rawData]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      const parser = getParser(rawRequestBodyType);
      const codeString = code.trim();
      if (!codeString) {
        /* if empty then no need to show error */
        setIsError(false);
        return;
      }
      const { success = false } = await formatCode(
        codeString,
        parser,
        indentationSize
      );
      // Only update if different
      setIsError((prev) => (prev !== !success ? !success : prev));
    }, 500); // debounce for 500ms

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [code, indentationSize, rawRequestBodyType]);

  const handleChange = useCallback((value: string) => setCode(value), []);

  const handleBlur = useCallback(
    () => handleChangeRawData(code),
    [code, handleChangeRawData]
  );

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full relative",
        "rounded-md border",
        "bg-background/10",
        "backdrop-blur-xs",
        {
          "border-destructive/50 ring-1 ring-destructive/50": isError,
        }
      )}
    >
      <Code
        fontSize={16}
        code={code}
        contentType={rawRequestBodyType}
        onChange={handleChange}
        onBlur={handleBlur}
        zoomable={true}
        lineWrap={codeLineWrap}
        handleLineWrap={handleToggleCodeLineWrap}
        handleFormat={handleFormat}
        placeholder={placeholderLabel(rawRequestBodyType)}
        className="static"
      />
      <ErrorAlert1 isError={isError} message="Request body have some errors." />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});
BodyCode.displayName = "Request data code area";

export default BodyCode;
