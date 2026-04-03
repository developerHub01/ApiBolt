import { memo, useCallback } from "react";
import Code from "@/components/ui/code";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRequestTestScript } from "@/context/collections/request/meta-data/test-script/RequestTestScriptProvider";
import useCodeError from "@/hooks/code/use-code-error";
import CodeErrorWrapper from "@/components/ui/code-error-wrapper";
import { codeFormatter } from "@/utils/code";

const RequestScriptContent = memo(() => {
  const { code, handleChangeScript, handleBlurScript } = useRequestTestScript();

  const { isError } = useCodeError({
    code,
    contentType: "javascript",
  });

  const handleFormat = useCallback(
    async () =>
      await codeFormatter({
        rawRequestBodyType: "javascript",
        code,
        callback: handleChangeScript,
        showErrorToast: true,
      }),
    [code, handleChangeScript],
  );

  return (
    <CodeErrorWrapper
      isError={isError}
      errorLabel="Script have some errors."
      className="rounded-md border"
    >
      <ScrollArea
        className={cn(
          "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
          "bg-background/10",
          "rounded-md border",
          "backdrop-blur-xs",
        )}
      >
        <Code
          code={code}
          contentType={"javascript"}
          editable={true}
          zoomable={true}
          lineWrap={true}
          copy={true}
          handleFormat={handleFormat}
          // handleLineWrap={handleToggleLineWrap}
          onChange={handleChangeScript}
          onBlur={handleBlurScript}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CodeErrorWrapper>
  );
});

export default RequestScriptContent;
