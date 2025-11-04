import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import RequestResponseProvider from "@/context/collections/request/RequestResponseProvider";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadParams } from "@/context/redux/request-response/thunks/params";
import { loadHeaders } from "@/context/redux/request-response/thunks/headers";
import { loadRequestBodyRaw } from "@/context/redux/request-response/thunks/body-raw";
import { loadRequestBodyBinary } from "@/context/redux/request-response/thunks/body-binary";
import { loadRequestMetaTab } from "@/context/redux/request-response/thunks/request-meta-tab";
import { loadBodyXWWWFormUrlencoded } from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
import { loadBodyFormData } from "@/context/redux/request-response/thunks/body-form-data";
import { loadMetaShowColumn } from "@/context/redux/request-response/thunks/meta-show-column";
import { loadApiUrl } from "@/context/redux/request-url/thunks/request-url";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";
import { loadShowHiddenMetaData } from "@/context/redux/request-response/thunks/show-hidden-meta-data";
import { selectIsRequestOrFolderExist } from "@/context/redux/request-response/selectors/request-list";
import RequestOrFolderNotFound from "@/components/app/collections/RequestOrFolderNotFound";

const RequestLayout = () => {
  const dispatch = useAppDispatch();
  const { id: requestOrFolderId } = useParams<{ id?: string }>();
  const isExist = useAppSelector((state) =>
    selectIsRequestOrFolderExist(state, requestOrFolderId)
  );

  useEffect(() => {
    if (!isExist) return;
    const payload = {
      requestOrFolderId: requestOrFolderId,
      once: true,
    };
    [
      loadAuthorization,
      loadParams,
      loadHeaders,
      loadRequestMetaTab,
      loadMetaShowColumn,
      loadShowHiddenMetaData,
      loadBodyFormData,
      loadBodyXWWWFormUrlencoded,
      loadRequestBodyRaw,
      loadRequestBodyBinary,
      loadApiUrl,
    ].forEach((action) => dispatch(action(payload)));
  }, [dispatch, isExist, requestOrFolderId]);

  if (!isExist) return <RequestOrFolderNotFound type="request" />;

  return (
    <RequestResponseProvider>
      <Outlet />
    </RequestResponseProvider>
  );
};

export default RequestLayout;
