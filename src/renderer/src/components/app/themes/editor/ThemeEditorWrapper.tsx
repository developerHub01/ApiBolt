import React, { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useThemeEditor } from "@/context/theme/theme-editor/ThemeEditorProvider";
import CodeErrorWrapper from "@/components/ui/code-error-wrapper";

interface Props {
  children: React.ReactNode;
}

const ThemeEditorWrapper = memo(({ children }: Props) => {
  const { haveError } = useThemeEditor();

  return (
    <CodeErrorWrapper
      isError={haveError}
      errorLabel="Theme palette color are not valid."
      className="rounded-lg"
    >
      <ScrollArea
        className={cn(
          "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full w-full p-3 bg-background",
        )}
      >
        {children}
      </ScrollArea>
    </CodeErrorWrapper>
  );
});

export default ThemeEditorWrapper;
