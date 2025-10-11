import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadEnvironmentsList } from "@/context/redux/request-response/thunks/environment";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";
import { loadProjectList } from "@/context/redux/request-response/thunks/projects";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";
import { loadActiveTab } from "@/context/redux/sidebar/sidebar-thunk";

const LoadBasicReduxState = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadActiveTab());
      await dispatch(loadProjectList());
      await dispatch(loadEnvironmentsList());
      await dispatch(
        loadAuthorization({
          requestOrFolderId: DEFAULT_AUTHORIZATION_ID,
        })
      );
    })();
  }, [dispatch]);

  return null;
};

export default LoadBasicReduxState;
