import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadRequestList } from "@/context/redux/request-response/thunks/request-list";
import { selectRequestListIsLoading } from "@/context/redux/status/selectors/request-list";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import RequestList from "@/components/app/mock/request-list/content/request-list/RequestList";
import TreeView from "@/components/ui/tree-view/TreeView";
import RequestListRestArea from "@/components/app/mock/request-list/RequestListRestArea";

const RequestListContent = memo(() => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectRequestListIsLoading);
  const showSkeleton = useShowSkeleton(isLoading, 80);
  const isRequestListLoaded = useAppSelector(
    state => state.requestResponse.isRequestListLoaded,
  );

  useEffect(() => {
    if (isRequestListLoaded) return;
    dispatch(loadRequestList());
  }, [dispatch, isRequestListLoaded]);

  return (
    <TreeView.ContentWrapper
      showSkeleton={showSkeleton}
      haveAutoActiveScroll
      restArea={<RequestListRestArea />}
    >
      <RequestList />
    </TreeView.ContentWrapper>
  );
});

export default RequestListContent;
