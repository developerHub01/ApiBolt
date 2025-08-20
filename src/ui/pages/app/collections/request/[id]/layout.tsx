import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import RequestResponseProvider from "@/context/collections/request/RequestResponseProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  loadHeaders,
  loadParams,
  loadRequestBodyBinary,
  loadRequestBodyRaw,
} from "@/context/redux/request-response/request-response-thunk";

const RequestLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestId } = useParams();

  useEffect(() => {
    const payload = { once: true };
    [
      loadParams,
      loadHeaders,
      loadRequestBodyRaw,
      loadRequestBodyBinary,
    ].forEach((action) => dispatch(action(payload)));
  }, [dispatch, requestId]);

  return (
    <RequestResponseProvider>
      <Outlet />
    </RequestResponseProvider>
  );
};

export default RequestLayout;
