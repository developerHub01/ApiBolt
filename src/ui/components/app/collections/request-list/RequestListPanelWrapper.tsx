import { memo, useCallback, useEffect, useRef } from "react";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import useIsSmallDevice from "@/hooks/use-is-small-device";
import { cn } from "@/lib/utils";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import SmallDeviceListWrapper from "@/components/app/collections/request-list/SmallDeviceListWrapper";
import { selectIsRequestListCollapsed } from "@/context/redux/request-response/selectors/request-list";
import { ResizablePanel } from "@/components/ui/resizable";

const RequestListPanelWrapper = memo(() => {
  const dispath = useAppDispatch();
  const isSmallDevice = useIsSmallDevice(951);
  const resizablePanelRef = useRef<ImperativePanelHandle>(null);
  const requestListCollapsed = useAppSelector(selectIsRequestListCollapsed);
  // const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  useEffect(() => {
    const panel = resizablePanelRef.current;
    if (!panel) return;

    if (requestListCollapsed) panel.collapse();
    else panel.expand();
  }, [requestListCollapsed]);

  const handleCollapse = useCallback(
    () => dispath(handleToggleRequestList(true)),
    [dispath]
  );

  if (isSmallDevice)
    return (
      <SmallDeviceListWrapper
        handleCollapse={handleCollapse}
        isCollapsed={requestListCollapsed}
      />
    );

  return (
    <ResizablePanel
      collapsible
      defaultSize={30}
      minSize={20}
      maxSize={40}
      className={cn("backdrop-blur-xs w-full bg-background/30 border-r-4", {
        // "border-r-4 border-l-0": layoutTypes === "ltr",
        // "border-l-4 border-r-0": layoutTypes === "rtl",
      })}
      style={{
        maxWidth: "40vw",
      }}
      ref={resizablePanelRef}
    >
      {isSmallDevice || <RequestListPanel />}
    </ResizablePanel>
  );
});

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
