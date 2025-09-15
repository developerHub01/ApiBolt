import { memo, useCallback, useEffect, useRef } from "react";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import useIsSmallDevice from "@/hooks/use-is-small-device";
import { cn } from "@/lib/utils";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";
import SmallDeviceListWrapper from "@/components/app/collections/request-list/SmallDeviceListWrapper";
import { selectIsRequestListCollapsed } from "@/context/redux/request-response/selectors/request-list";

const RequestListPanelWrapper = memo(() => {
  const dispath = useAppDispatch();
  const isSmallDevice = useIsSmallDevice(951);
  const resizablePanelRef = useRef<ImperativePanelHandle>(null);
  const requestListCollapsed = useAppSelector(selectIsRequestListCollapsed);
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  useEffect(() => {
    const panel = resizablePanelRef.current;
    if (!panel) return;

    if (requestListCollapsed) panel.collapse();
    else panel.expand();
  }, [requestListCollapsed]);

  /* when resize to desktop from mini devices it will expend the collapse to resolve collision */
  useEffect(() => {
    if (isSmallDevice) dispath(handleToggleRequestList(true));
    else dispath(handleToggleRequestList(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallDevice]);

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

  if (requestListCollapsed) return null;

  return (
    <div
      className={cn(
        "backdrop-blur-xs h-full w-full md:max-w-[320px] lg:max-w-[380px] xl:max-w-[450px] grow-0 bg-background/30",
        {
          "border-r-4": layoutTypes === "ltr",
          "border-l-4": layoutTypes === "rtl",
        }
      )}
    >
      <RequestListPanel />
    </div>
  );
});

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
