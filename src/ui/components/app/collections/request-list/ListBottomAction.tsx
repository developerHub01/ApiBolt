import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FilePlus as FileAddIcon,
  FolderPlus as FolderAddIcon,
  FolderDot as RestApiBasicAddIcon,
  Trash2 as DeleteIcon,
  RefreshCw as RefreshIcon,
  ChevronsDownUp as CollapseIcon,
  type LucideIcon,
} from "lucide-react";
import {
  collapseAllRequestOrFolder,
  createCollectionBySelectedTab,
  createRestApiBasicBySelectedTab,
  createSingleRequestBySelectedTab,
} from "@/context/redux/request-response/thunks/request-list";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeDeleteFolderOrRequestId } from "@/context/redux/request-response/request-response-slice";
import { selectSelectedTab } from "@/context/redux/request-response/request-response-selector";

type ButtonType =
  | "add-request"
  | "add-folder"
  | "add-rest-api-basic-folder"
  | "refresh"
  | "collapse"
  | "delete";

interface ButtonInterface {
  id: ButtonType;
  label: string;
  Icon: LucideIcon;
}

const buttonList: Array<ButtonInterface> = [
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
    label: "Add Rest Api Basic Folder",
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

const deleteButton: ButtonInterface = {
  id: "delete",
  label: "Delete Selected",
  Icon: DeleteIcon,
};

const ListBottomAction = memo(() => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (type: ButtonType) => {
      switch (type) {
        case "add-request":
          return dispatch(createSingleRequestBySelectedTab());
        case "add-folder":
          return dispatch(createCollectionBySelectedTab());
        case "add-rest-api-basic-folder":
          return dispatch(createRestApiBasicBySelectedTab());
        case "collapse":
          return dispatch(collapseAllRequestOrFolder());
      }
    },
    [dispatch]
  );

  return (
    <div className="flex items-center justify-end gap-2 px-2 py-1.5 border-t-2">
      {buttonList.map((item) => (
        <ActionButton key={item.id} {...item} onClick={handleClick} />
      ))}
      <DeleteButton />
    </div>
  );
});

interface ActionButtonProps extends ButtonInterface {
  onClick?: (id: ButtonType) => void;
}

const ActionButton = memo(({ id, label, Icon, onClick }: ActionButtonProps) => {
  return (
    <Tooltip key={id}>
      <TooltipTrigger asChild>
        <Button
          size={"iconXs"}
          variant={"ghost"}
          onClick={() => onClick && onClick(id)}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
});

const DeleteButton = memo(() => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(selectSelectedTab);
  const handleClick = useCallback(
    () => dispatch(handleChangeDeleteFolderOrRequestId(id!)),
    [dispatch, id]
  );

  if (!id) return null;
  return <ActionButton {...deleteButton} onClick={handleClick} />;
});

export default ListBottomAction;
