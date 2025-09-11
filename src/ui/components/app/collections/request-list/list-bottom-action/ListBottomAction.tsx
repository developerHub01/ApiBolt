import { memo, useCallback, useMemo } from "react";
import {
  FilePlus as FileAddIcon,
  FolderPlus as FolderAddIcon,
  FolderDot as RestApiBasicAddIcon,
  RefreshCw as RefreshIcon,
  ChevronsDownUp as CollapseIcon,
} from "lucide-react";
import {
  collapseAllRequestOrFolder,
  createCollectionBySelectedTab,
  createRestApiBasicBySelectedTab,
  createSingleRequestBySelectedTab,
  loadRequestList,
} from "@/context/redux/request-response/thunks/request-list";
import { useAppDispatch } from "@/context/redux/hooks";
import type {
  BottomActionButtonInterface,
  ListBottomActionType,
} from "@/types/request-list";
import ActionButton from "@/components/app/collections/request-list/list-bottom-action/ActionButton";
import DeleteButton from "@/components/app/collections/request-list/list-bottom-action/DeleteButton";
import useRequestItemDetails from "@/hooks/request-response/request-list/use-request-item-details";

const buttonList: Array<BottomActionButtonInterface> = [
  {
    id: "add-request",
    label: "Add Request",
    Icon: FileAddIcon,
  },
  {
    id: "add-folder",
    label: "Add Folder",
    Icon: FolderAddIcon,
  },
  {
    id: "add-rest-api-basic-folder",
    label: "Add REST API Basic Folder",
    Icon: RestApiBasicAddIcon,
  },
  {
    id: "refresh",
    label: "Refresh List",
    Icon: RefreshIcon,
  },
  {
    id: "collapse",
    label: "Collapse All Folders",
    Icon: CollapseIcon,
  },
];

const folderTypeIdList = ["add-folder", "add-rest-api-basic-folder"];

const ListBottomAction = memo(() => {
  const dispatch = useAppDispatch();
  const { checkIsFolderAddable } = useRequestItemDetails();

  const handleClick = useCallback(
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

  const list = useMemo(() => {
    const showFolderButton = checkIsFolderAddable();
    if (showFolderButton) return buttonList;

    return buttonList.filter((item) => !folderTypeIdList.includes(item.id));
  }, [checkIsFolderAddable]);

  return (
    <div className="flex items-center justify-end gap-1.5 px-2 py-1.5 border-t-2">
      {list.map((item) => (
        <ActionButton key={item.id} {...item} onClick={handleClick} />
      ))}
      <DeleteButton />
    </div>
  );
});

export default ListBottomAction;
