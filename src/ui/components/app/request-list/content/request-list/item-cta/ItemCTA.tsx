import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical as ThreeDotIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRequestFolder } from "@/context/request-list/RequestFolderProvider";
import { motion } from "motion/react";
import {
  createCollection,
  createSingleRequest,
  duplicateRequestOrFolder,
} from "@/context/redux/request-response/request-response-thunk";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeDeleteFolderOrRequestId } from "@/context/redux/request-response/request-response-slice";
import { memo, useCallback, type MouseEvent } from "react";

type TActionType =
  | "add_request"
  | "add_folder"
  | "rename"
  | "duplicate"
  | "delete";

const folderCTAList: Array<{
  id: TActionType;
  label: string;
}> = [
  {
    id: "add_request",
    label: "Add Request",
  },
  {
    id: "add_folder",
    label: "Add Folder",
  },
  {
    id: "rename",
    label: "Rename",
  },
  {
    id: "duplicate",
    label: "Duplicate",
  },
  {
    id: "delete",
    label: "Delete",
  },
];

const requestCTAList: Array<{
  id: TActionType;
  label: string;
}> = [
  {
    id: "rename",
    label: "Rename",
  },
  {
    id: "duplicate",
    label: "Duplicate",
  },
  {
    id: "delete",
    label: "Delete",
  },
];

interface ItemCTAProps {
  type: "request" | "folder";
  id: string;
}

const ItemCTA = memo(({ type, id }: ItemCTAProps) => {
  const dispatch = useAppDispatch();
  const { isContextMenuOpen, handleToggleContextMenu, handleRenameAction } =
    useRequestFolder();

  const handleCTAAction = (actionType: string) => {
    switch (actionType as TActionType) {
      case "delete": {
        dispatch(handleChangeDeleteFolderOrRequestId(id));
        break;
      }
      case "add_folder": {
        dispatch(createCollection(id));
        break;
      }
      case "add_request": {
        dispatch(createSingleRequest(id));
        break;
      }
      case "rename": {
        handleRenameAction();
        break;
      }
      case "duplicate": {
        dispatch(duplicateRequestOrFolder(id));
        break;
      }
    }
  };

  const handlePreventPropagation = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      key={`request-item-cta-${id}`}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      <DropdownMenu
        open={isContextMenuOpen}
        onOpenChange={handleToggleContextMenu}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={"iconXs"}
            className={cn(
              "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto",
              {
                "opacity-100 pointer-events-auto": isContextMenuOpen,
                "opacity-0 pointer-events-none": !isContextMenuOpen,
              }
            )}
            onClick={handlePreventPropagation}
          >
            <ThreeDotIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 [&>div]:cursor-pointer"
          align="start"
          onClick={handlePreventPropagation}
        >
          <CTAList
            list={type === "folder" ? folderCTAList : requestCTAList}
            onClick={handleCTAAction}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
});

interface CTAListProps {
  list: Array<{
    id: string;
    label: string;
  }>;
  onClick: (id: string) => void;
}

const CTAList = memo(({ list, onClick }: CTAListProps) => {
  return list.map(({ id, label }) => (
    <DropdownMenuItem key={id} onClick={() => onClick(id)}>
      {label}
    </DropdownMenuItem>
  ));
});

export default ItemCTA;
