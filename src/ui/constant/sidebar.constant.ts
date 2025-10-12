import type { TSidebarTab } from "@/types/sidebar.types";
import {
  Boxes as CollectionsIcon,
  Container as EnvironmentsIcon,
  type LucideIcon,
  Layers as ProjectsIcon,
  KeyRound as AuthorizationIcon,
} from "lucide-react";

export const SIDEBAR_MENU_LIST: Array<{
  id: TSidebarTab;
  Icon: LucideIcon;
  label: string;
  path: string;
}> = [
  {
    id: "projects",
    Icon: ProjectsIcon,
    label: "Projects (Ctrl+Shift+P)",
    path: "/projects",
  },
  {
    id: "collections",
    Icon: CollectionsIcon,
    label: "Collections (Ctrl+Shift+C)",
    path: "/",
  },
  {
    id: "environments",
    Icon: EnvironmentsIcon,
    label: "Environments (Ctrl+Shift+E)",
    path: "/environments",
  },
  {
    id: "authorization",
    Icon: AuthorizationIcon,
    label: "Authorization (Ctrl+Shift+A)",
    path: "/authorization",
  },
];

export const HIDDEN_TABS_WHEN_NOT_PROJECT_SELECTED: Array<TSidebarTab> = [
  "collections",
  "environments",
  "authorization",
];

export const LOCAL_STORAGE_SIDEBAR_ACTIVE_TAB_KEY = "sidebar-active-tab";

export const LOCAL_STORAGE_SIDEBAR_LAST_ACTIVE_TAB_KEY = "sidebar-last-active-tab";
