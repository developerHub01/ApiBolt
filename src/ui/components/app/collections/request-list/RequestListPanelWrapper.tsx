import { memo, useCallback } from "react";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectIsRequestListCollapsed } from "@/context/redux/request-response/selectors/request-list";
import { ApiBoltResizableLeftPanel } from "@/components/ui/api-bolt-resizable";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";

const RequestListPanelWrapper = memo(() => {
  const dispath = useAppDispatch();
  const isCollapsed = useAppSelector(selectIsRequestListCollapsed);

  const handleCollapse = useCallback(
    () => dispath(handleToggleRequestList(true)),
    [dispath]
  );

  return (
    <ApiBoltResizableLeftPanel
      isCollapsed={isCollapsed}
      handleCollapse={handleCollapse}
    >
      <RequestListPanel />
    </ApiBoltResizableLeftPanel>
  );
});

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
