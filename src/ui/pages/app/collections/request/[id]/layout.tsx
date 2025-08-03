import { Outlet, useParams } from "react-router-dom";
import RequestResponseProvider from "@/context/collections/request/RequestResponseProvider";
import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  loadHeaders,
  loadParams,
} from "@/context/redux/request-response/request-response-thunk";

const RequestLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestId } = useParams();

  useEffect(() => {
    dispatch(
      loadParams({
        once: true,
      })
    );
    dispatch(
      loadHeaders({
        once: true,
      })
    );
  }, [dispatch, requestId]);

  return (
    <RequestResponseProvider>
      <Outlet />
    </RequestResponseProvider>
  );
};

export default RequestLayout;
