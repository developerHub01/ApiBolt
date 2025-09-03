import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadEnvironmentsList } from "@/context/redux/request-response/thunks/environment";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";
import { loadProjectList } from "@/context/redux/request-response/thunks/projects";

const LoadBasicReduxState = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadProjectList());
      await dispatch(loadEnvironmentsList());
      await dispatch(loadAuthorization());
    })();
  }, [dispatch]);

  return null;
};

export default LoadBasicReduxState;
