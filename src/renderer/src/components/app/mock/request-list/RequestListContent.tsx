import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadRequestList } from "@/context/redux/mock/thunks/request-list";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import RequestList from "@/components/app/mock/request-list/content/request-list/RequestList";
import TreeView from "@/components/ui/tree-view/TreeView";
import RequestListRestArea from "@/components/app/mock/request-list/RequestListRestArea";
import { selectMockRequestListIsLoading } from "@/context/redux/status/selectors/mock-request-list";

const RequestListContent = memo(() => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectMockRequestListIsLoading);
  const showSkeleton = useShowSkeleton(isLoading, 80);
  const isRequestListLoaded = useAppSelector(
    state => state.mock.isRequestListLoaded,
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
