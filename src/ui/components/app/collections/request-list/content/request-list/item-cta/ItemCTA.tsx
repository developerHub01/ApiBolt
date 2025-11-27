import { memo, useCallback, useMemo, type MouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical as ThreeDotIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeDeleteFolderOrRequestId } from "@/context/redux/request-response/request-response-slice";
import { useRequestListItem } from "@/context/collections/request-list/RequestListItemProvider";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";
import type { TLayoutSetting } from "@/types/setting.types";
import {
  createCollection,
  createRestApiBasic,
  createSingleRequest,
  duplicateRequestOrFolder,
} from "@/context/redux/request-response/thunks/request-list";
import { checkPermissionToAddFolderAsChildren } from "@/utils/request-response.utils";
import {
  exportFolder,
  exportRequest,
  importFolder,
  importRequest,
} from "@/context/redux/request-response/thunks/request";
import { toast } from "sonner";

type TActionType =
  | "add_request"
  | "add_folder"
  | "add_rest_api_basics"
  | "rename"
  | "duplicate"
  | "delete"
  | "export"
  | "import";

const folderAddActionList: Array<TActionType> = [
  "add_folder",
  "add_rest_api_basics",
  "import",
];

type TMenuListType = Record<
  string,
  Array<{
    id: TActionType;
    label: string;
    sublabel?: string;
  }>
>;

const folderCTAList: TMenuListType = {
  add: [
    {
      id: "add_request",
      label: "Add Request",
    },
    {
      id: "add_folder",
      label: "Add Folder",
    },
    {
      id: "add_rest_api_basics",
      label: "Add REST API Basics",
    },
  ],
  modify: [
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
  ],
  transfer: [
    {
      id: "export",
      label: "Export",
    },
    {
      id: "import",
      label: "Import",
    },
  ],
};

const requestCTAList: TMenuListType = {
  modify: [
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
  ],
  transfer: [
    {
      id: "export",
      label: "Export",
    },
    {
      id: "import",
      label: "Import",
      sublabel: "replace current",
    },
  ],
};

const ItemCTA = memo(() => {
  const dispatch = useAppDispatch();
  const {
    id,
    lavel,
    type,
    isContextMenuOpen,
    handleToggleContextMenu,
    handleRenameAction,
  } = useRequestListItem();
  const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();

  const handleCTAAction = useCallback(
    async (actionType: string) => {
      switch (actionType as TActionType) {
        case "delete": {
          return dispatch(handleChangeDeleteFolderOrRequestId(id));
        }
        case "add_folder": {
          return dispatch(createCollection(id));
        }
        case "add_rest_api_basics": {
          return dispatch(createRestApiBasic(id));
        }
        case "add_request": {
          return dispatch(createSingleRequest(id));
        }
        case "rename": {
          return handleRenameAction();
        }
        case "duplicate": {
          return dispatch(duplicateRequestOrFolder(id));
        }
        case "export": {
          const { success, message } = await dispatch(
            type === "request" ? exportRequest(id) : exportFolder(id)
          ).unwrap();
          if (success) toast.success(message);
          else toast.error(message);
          return;
        }
        case "import": {
          const { success, message } = await (
            type === "request"
              ? dispatch(importRequest(id))
              : dispatch(importFolder(id))
          ).unwrap();
          if (success) toast.success(message);
          else toast.error(message);
        }
      }
    },
    [dispatch, handleRenameAction, id, type]
  );

  const handlePreventPropagation = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  const menuList = useMemo(() => {
    if (type === "request") return requestCTAList;
    if (checkPermissionToAddFolderAsChildren(lavel)) return folderCTAList;

    const menu: TMenuListType = {};
    Object.keys(folderCTAList).forEach((key) => {
      const subMenuList = folderCTAList[key].filter(
        (item) => !folderAddActionList.includes(item.id)
      );
      if (!subMenuList.length) return;
      menu[key] = subMenuList;
    });
    return menu;
  }, [lavel, type]);

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
          className="p-0 w-fit min-w-40 flex flex-col [&>button]:justify-start [&>div]:cursor-pointer"
          align={layoutTypes === "rtl" ? "start" : "end"}
          onClick={handlePreventPropagation}
        >
          {Object.values(menuList).map((list, index, arr) => (
            <>
              {list.map(({ id, label, sublabel }) => (
                <DropdownMenuItem
                  key={id}
                  className="cursor-pointer"
                  onClick={() => handleCTAAction(id)}
                >
                  {label}{" "}
                  {Boolean(sublabel) && (
                    <span className="text-xs text-muted-foreground">
                      ({sublabel})
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
              {index !== arr.length - 1 && <DropdownMenuSeparator />}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
});

export default ItemCTA;
