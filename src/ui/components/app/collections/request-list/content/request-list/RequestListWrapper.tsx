import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadRequestList } from "@/context/redux/request-response/request-response-thunk";
import RequestList from "@/components/app/collections/request-list/content/request-list/RequestList";

const RequestListWrapper = memo(() => {
  const dispatch = useAppDispatch();
  const isRequestListLoaded = useAppSelector(
    (state) => state.requestResponse.isRequestListLoaded
  );

  useEffect(() => {
    if (isRequestListLoaded) return;

    dispatch(loadRequestList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRequestListLoaded]);

  return <RequestList />;
});

export default RequestListWrapper;
