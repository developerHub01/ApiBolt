import { memo } from "react";
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
  type LucideIcon,
} from "lucide-react";
import {
  createCollectionBySelectedTab,
  createRestApiBasicBySelectedTab,
  createSingleRequestBySelectedTab,
} from "@/context/redux/request-response/thunks/request-list";
import { useAppDispatch } from "@/context/redux/hooks";

type ButtonType = "add-request" | "add-folder" | "add-rest-api-basic-folder";

const buttonList: Array<{
  id: ButtonType;
  label: string;
  Icon: LucideIcon;
}> = [
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
];

const ListBottomAction = memo(() => {
  const dispatch = useAppDispatch();

  const handleClick = (type: ButtonType) => {
    switch (type) {
      case "add-request":
        return dispatch(createSingleRequestBySelectedTab());
      case "add-folder":
        return dispatch(createCollectionBySelectedTab());
      case "add-rest-api-basic-folder":
        return dispatch(createRestApiBasicBySelectedTab());
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 px-2 py-1.5 border-t-2">
      {buttonList.map(({ id, label, Icon }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button
              size={"iconXs"}
              variant={"ghost"}
              onClick={() => handleClick(id)}
            >
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
});

export default ListBottomAction;
