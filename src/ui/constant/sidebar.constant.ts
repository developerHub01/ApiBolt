import type { TSidebarTab } from "@/types/sidebar.types";
import {
  Boxes as CollectionsIcon,
  Container as EnvironmentsIcon,
  type LucideIcon,
  Layers as ProjectsIcon,
  KeyRound as AuthorizationIcon,
  Palette as ThemeIcon,
} from "lucide-react";

export const SIDEBAR_MENU_LIST: Array<{
  id: Exclude<TSidebarTab, null>;
  Icon: LucideIcon;
  label: string;
  path: string;
}> = [
  {
    id: "navigate_projects",
    Icon: ProjectsIcon,
    label: "Projects",
    path: "/projects",
  },
  {
    id: "navigate_collections",
    Icon: CollectionsIcon,
    label: "Collections",
    path: "/",
  },
  {
    id: "navigate_environments",
    Icon: EnvironmentsIcon,
    label: "Environments",
    path: "/environments",
  },
  {
    id: "navigate_authorization",
    Icon: AuthorizationIcon,
    label: "Authorization",
    path: "/authorization",
  },
  {
    id: "navigate_themes",
    Icon: ThemeIcon,
    label: "Themes",
    path: "/themes",
  },
];

export const HIDDEN_TABS_WHEN_NOT_PROJECT_SELECTED: Array<TSidebarTab> = [
  "navigate_collections",
  "navigate_environments",
  "navigate_authorization",
];

export const LOCAL_STORAGE_SIDEBAR_ACTIVE_TAB_KEY = "sidebar-active-tab";

export const LOCAL_STORAGE_SIDEBAR_LAST_ACTIVE_TAB_KEY =
  "sidebar-last-active-tab";
