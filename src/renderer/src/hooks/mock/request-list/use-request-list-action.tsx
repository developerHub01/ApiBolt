import { useCallback, useMemo } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  collapseAllRequestOrFolder,
  createCollectionBySelectedTab,
  createRestApiBasicBySelectedTab,
  createSingleRequestBySelectedTab,
  loadRequestList,
} from "@/context/redux/mock/thunks/request-list";
import type { ListBottomActionType } from "@shared/types/request-list";
import useRequestItemDetails from "@/hooks/mock/request-list/use-request-item-details";
import {
  MOCK_REQUEST_LIST_ACTION_BUTTON_LIST,
  MOCK_REQUEST_LIST_ACTION_FOLDER_TYPE_ID_LIST,
} from "@/constant/mock-request-list.constant";

const useRequestListAction = () => {
  const dispatch = useAppDispatch();
  const { checkIsFolderAddable } = useRequestItemDetails();

  const list = useMemo(() => {
    const showFolderButton = checkIsFolderAddable();
    if (showFolderButton) return MOCK_REQUEST_LIST_ACTION_BUTTON_LIST;

    return MOCK_REQUEST_LIST_ACTION_BUTTON_LIST.filter(
      item => !MOCK_REQUEST_LIST_ACTION_FOLDER_TYPE_ID_LIST.includes(item.id),
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
        default:
          return;
      }
    },
    [dispatch],
  );

  return {
    list,
    handleAction,
  };
};

export default useRequestListAction;
