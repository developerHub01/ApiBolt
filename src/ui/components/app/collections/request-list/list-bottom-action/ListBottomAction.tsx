import { memo, useCallback } from "react";
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

const ListBottomAction = memo(() => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="flex items-center justify-end gap-1.5 px-2 py-1.5 border-t-2">
      {buttonList.map((item) => (
        <ActionButton key={item.id} {...item} onClick={handleClick} />
      ))}
      <DeleteButton />
    </div>
  );
});

export default ListBottomAction;
