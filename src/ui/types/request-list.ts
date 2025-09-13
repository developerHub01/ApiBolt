import type { LucideIcon } from "lucide-react";

export type ListBottomActionType =
  | "add-request"
  | "add-folder"
  | "add-rest-api-basic-folder"
  | "refresh"
  | "collapse"
  | "delete";

export type TRequestListItemType = "request" | "folder";

export interface BottomActionButtonInterface {
  id: ListBottomActionType;
  label: string;
  Icon: LucideIcon;
}
