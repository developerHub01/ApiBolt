import { lazy, memo, Suspense, useCallback } from "react";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectIsRequestListCollapsed } from "@/context/redux/request-response/selectors/request-list";
import { ApiBoltResizableLeftPanel } from "@/components/ui/api-bolt-resizable";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
const RequestListPanel = lazy(
  () => import("@/components/app/collections/request-list/RequestListPanel"),
);
import RequestListPanelFallback from "@/fallback/collection/RequestListPanelFallback";

const RequestListPanelWrapper = memo(() => {
  const dispath = useAppDispatch();
  const isCollapsed = useAppSelector(selectIsRequestListCollapsed);

  const handleCollapse = useCallback(
    () => dispath(handleToggleRequestList(true)),
    [dispath],
  );

  return (
    <ApiBoltResizableLeftPanel
      isCollapsed={isCollapsed}
      handleCollapse={handleCollapse}
    >
      <Suspense fallback={<RequestListPanelFallback />}>
        <RequestListPanel />
      </Suspense>
    </ApiBoltResizableLeftPanel>
  );
});

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
