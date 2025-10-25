import { useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadEnvironmentsList } from "@/context/redux/request-response/thunks/environment";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";
import { loadActiveTab } from "@/context/redux/sidebar/sidebar-thunk";
import { loadCodeSnippitType } from "@/context/redux/request-response/thunks/code-snippit";
import { loadProjectList } from "@/context/redux/project/thunks/projects";
import { loadKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/thunks/keyboard-shortcuts";

const LoadBasicReduxState = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(loadKeyboardShortcuts()),
        dispatch(loadCodeSnippitType()),
        dispatch(loadActiveTab()),
        dispatch(loadProjectList()),
        dispatch(loadEnvironmentsList()),
        dispatch(
          loadAuthorization({
            requestOrFolderId: DEFAULT_AUTHORIZATION_ID,
          })
        ),
      ]);
    })();
  }, [dispatch]);

  return null;
};

export default LoadBasicReduxState;
