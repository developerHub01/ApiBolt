import { memo, useCallback, useEffect, useState } from "react";
import { formatCode, getParser } from "@/utils/prettier.utils";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import Code from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import type { TContentType } from "@/types/request-response.types";
import { cn } from "@/lib/utils";
import {
  selectRawData,
  selectRawRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";
import { TriangleAlert as AlertIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { codeFormatter } from "@/utils/code";

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
      const { success = false } = await formatCode(codeString, parser);
      // Only update if different
      setIsError((prev) => (prev !== !success ? !success : prev));
    }, 500); // debounce for 500ms

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [code, rawRequestBodyType]);

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
        handleFormat={handleFormat}
        placeholder={placeholderLabel(rawRequestBodyType)}
        className="static"
      />
      <ErrorAlert isError={isError} />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});
BodyCode.displayName = "Request data code area";

interface ErrorAlertProps {
  isError: boolean;
}

const ErrorAlert = memo(({ isError }: ErrorAlertProps) => {
  return (
    <AnimatePresence>
      {isError && (
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "anticipate",
          }}
          className="absolute bottom-2 right-2 origin-center"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructiveSecondary"
                size={"iconXs"}
                className="rounded-full"
              >
                <AlertIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className="w-52 p-2 bg-accent [&>span>svg]:bg-accent [&>span>svg]:fill-accent text-accent-foreground"
              side="top"
              align="end"
              alignOffset={5}
            >
              <p>Request body have some errors.</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default BodyCode;
