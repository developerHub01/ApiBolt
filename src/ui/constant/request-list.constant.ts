import type { BottomActionButtonInterface } from "@/types/request-list";
import {
  FilePlus as FileAddIcon,
  FolderPlus as FolderAddIcon,
  FolderDot as RestApiBasicAddIcon,
  RefreshCw as RefreshIcon,
  ChevronsDownUp as CollapseIcon,
} from "lucide-react";

export const requestListActionButtonList: Array<BottomActionButtonInterface> = [
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

export const requestListActionFolderTypeIdList = [
  "add-folder",
  "add-rest-api-basic-folder",
];
