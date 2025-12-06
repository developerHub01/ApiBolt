import React, { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useThemeEditor } from "@/context/theme/theme-editor/ThemeEditorProvider";
import ErrorAlert1 from "@/components/ui/error-alert1";

interface Props {
  children: React.ReactNode;
}

const ThemeEditorWrapper = memo(({ children }: Props) => {
  const { haveError } = useThemeEditor();

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full w-full border rounded-lg p-3 relative bg-background",
        {
          "border-destructive": haveError,
        },
      )}
    >
      {children}
      <ErrorAlert1
        isError={haveError}
        message="Theme palette color are not valid."
      />
    </ScrollArea>
  );
});

export default ThemeEditorWrapper;
