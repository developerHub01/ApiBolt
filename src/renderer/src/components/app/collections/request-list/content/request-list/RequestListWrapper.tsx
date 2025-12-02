import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import RequestList from "@/components/app/collections/request-list/content/request-list/RequestList";
import { loadRequestList } from "@/context/redux/request-response/thunks/request-list";
import { selectRequestListIsLoading } from "@/context/redux/status/selectors/request-list";
import RequestListSkeleton from "@/components/app/collections/request-list/content/skeleton/RequestListSkeleton";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";

const RequestListWrapper = memo(() => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectRequestListIsLoading);
  const showSkeleton = useShowSkeleton(isLoading, 80);
  const isRequestListLoaded = useAppSelector(
    state => state.requestResponse.isRequestListLoaded
  );

  useEffect(() => {
    if (isRequestListLoaded) return;

    dispatch(loadRequestList());
  }, [dispatch, isRequestListLoaded]);

  return showSkeleton ? <RequestListSkeleton /> : <RequestList />;
});

export default RequestListWrapper;
