import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import RequestResponseProvider from "@/context/collections/request/RequestResponseProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadParams } from "@/context/redux/request-response/thunks/params";
import { loadHeaders } from "@/context/redux/request-response/thunks/headers";
import { loadRequestBodyRaw } from "@/context/redux/request-response/thunks/body-raw";
import { loadRequestBodyBinary } from "@/context/redux/request-response/thunks/body-binary";
import { loadRequestMetaTab } from "@/context/redux/request-response/thunks/request-meta-tab";
import { loadBodyXWWWFormUrlencoded } from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
import { loadBodyFormData } from "@/context/redux/request-response/thunks/body-form-data";
import { loadMetaShowColumn } from "@/context/redux/request-response/thunks/meta-show-column";
import { loadApiUrl } from "@/context/redux/request-url/request-url-thunk";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";

const RequestLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestId } = useParams();

  useEffect(() => {
    const payload = { once: true };
    [
      loadAuthorization,
      loadParams,
      loadHeaders,
      loadRequestMetaTab,
      loadMetaShowColumn,
      loadBodyFormData,
      loadBodyXWWWFormUrlencoded,
      loadRequestBodyRaw,
      loadRequestBodyBinary,
      loadApiUrl,
    ].forEach((action) => dispatch(action(payload)));
  }, [dispatch, requestId]);

  return (
    <RequestResponseProvider>
      <Outlet />
    </RequestResponseProvider>
  );
};

export default RequestLayout;
