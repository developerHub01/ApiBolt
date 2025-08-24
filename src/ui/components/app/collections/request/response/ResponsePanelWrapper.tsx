import React, { memo, useCallback } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { handleToggleCollapse } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch } from "@/context/redux/hooks";

interface ResponsePanelWrapperProps {
  children: React.ReactNode;
}

const ResponsePanelWrapper = memo(({ children }: ResponsePanelWrapperProps) => {
  const dispatch = useAppDispatch();
  const handleResize = useCallback(
    (size: number) => {
      dispatch(
        handleToggleCollapse({
          size,
        })
      );
    },
    [dispatch]
  );

  return (
    <ResizablePanel
      onResize={handleResize}
      id="response-panel"
      className="min-h-12 border-t-4"
      defaultSize={0}
    >
      {children}
    </ResizablePanel>
  );
});

ResponsePanelWrapper.displayName = "Response panel wrapper";

export default ResponsePanelWrapper;
