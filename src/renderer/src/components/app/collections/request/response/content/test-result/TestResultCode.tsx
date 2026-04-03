import { memo, useEffect, useState } from "react";
import Code from "@/components/ui/code";
import CodeErrorWrapper from "@/components/ui/code-error-wrapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TestResultCodePayloadInterface } from "@shared/types/test-script.types";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import { formatCode } from "@/utils/prettier.utils";

interface Props extends Pick<
  TestResultCodePayloadInterface,
  "code" | "language"
> {}

const TestResultCode = memo(({ code, language }: Props) => {
  const toast = useCustomToast();
  const [codeState, setCodeState] = useState<string>(code);

  useEffect(() => {
    if (language === "markdown") return;
    (async () => {
      try {
        const formattedCode = await formatCode(
          code,
          language === "javascript" ? "babel" : language,
          2,
        );
        if (!formattedCode?.success || !formattedCode?.data) return;
        setCodeState(formattedCode.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [code, language]);

  return (
    <CodeErrorWrapper
      isError={false}
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
          code={codeState}
          contentType={language}
          editable={false}
          zoomable={false}
          lineWrap={true}
          copy={true}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CodeErrorWrapper>
  );
});

export default TestResultCode;
