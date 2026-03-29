import { memo, useCallback, useEffect, useState } from "react";
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
import CodeErrorWrapper from "@/components/ui/code-error-wrapper";
import useCodeError from "@/hooks/code/use-code-error";

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
  const { isError } = useCodeError({
    code,
    contentType: rawRequestBodyType,
    indentationSize,
  });

  const handleFormat = useCallback(
    async () =>
      await codeFormatter({
        rawRequestBodyType,
        code,
        callback: setCode,
        showErrorToast: true,
      }),
    [rawRequestBodyType, code],
  );

  useEffect(() => {
    setCode(rawData);
  }, [rawData]);

  const handleChange = useCallback((value: string) => setCode(value), []);

  const handleBlur = useCallback(
    () => handleChangeRawData(code),
    [code, handleChangeRawData],
  );

  return (
    <CodeErrorWrapper
      isError={isError}
      errorLabel="Request body have some errors."
      className="rounded-md border"
    >
      <ScrollArea
        className={cn(
          "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
          "bg-background/10",
          "backdrop-blur-xs",
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CodeErrorWrapper>
  );
});
BodyCode.displayName = "Request data code area";

export default BodyCode;
