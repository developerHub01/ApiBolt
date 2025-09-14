import { useCallback, useMemo } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  collapseAllRequestOrFolder,
  createCollectionBySelectedTab,
  createRestApiBasicBySelectedTab,
  createSingleRequestBySelectedTab,
  loadRequestList,
} from "@/context/redux/request-response/thunks/request-list";
import type { ListBottomActionType } from "@/types/request-list";
import useRequestItemDetails from "@/hooks/request-response/request-list/use-request-item-details";
import {
  REQUEST_LIST_ACTION_BUTTON_LIST,
  REQUEST_LIST_ACTION_FOLDER_TYPE_ID_LIST,
} from "@/constant/request-list.constant";

const useRequestListAction = () => {
  const dispatch = useAppDispatch();
  const { checkIsFolderAddable } = useRequestItemDetails();

  const list = useMemo(() => {
    const showFolderButton = checkIsFolderAddable();
    if (showFolderButton) return REQUEST_LIST_ACTION_BUTTON_LIST;

    return REQUEST_LIST_ACTION_BUTTON_LIST.filter(
      (item) => !REQUEST_LIST_ACTION_FOLDER_TYPE_ID_LIST.includes(item.id)
    );
  }, [checkIsFolderAddable]);

  const handleAction = useCallback(
    (type: ListBottomActionType) => {
      switch (type) {
        case "add-request":
          return dispatch(createSingleRequestBySelectedTab());
        case "add-folder":
          return dispatch(createCollectionBySelectedTab());
        case "add-rest-api-basic-folder":
          return dispatch(createRestApiBasicBySelectedTab());
        case "refresh":
          return dispatch(loadRequestList());
        case "collapse":
          return dispatch(collapseAllRequestOrFolder());
      }
    },
    [dispatch]
  );

  return {
    list,
    handleAction,
  };
};

export default useRequestListAction;
