import type {
  SidebarMenuItemInterface,
  TSidebarTab
} from "@shared/types/sidebar.types";
import {
  Boxes as CollectionsIcon,
  Container as EnvironmentsIcon,
  Layers as ProjectsIcon,
  KeyRound as AuthorizationIcon,
  Palette as ThemeIcon,
  Store as ThemeMarketIcon,
  PencilRuler as ThemeEditorIcon
} from "lucide-react";

export const SIDEBAR_MENU_LIST: Array<SidebarMenuItemInterface> = [
  {
    id: "navigate_projects",
    Icon: ProjectsIcon,
    label: "Projects",
    path: "/projects"
  },
  {
    id: "navigate_collections",
    Icon: CollectionsIcon,
    label: "Collections",
    path: "/"
  },
  {
    id: "navigate_environments",
    Icon: EnvironmentsIcon,
    label: "Environments",
    path: "/environments"
  },
  {
    id: "navigate_authorization",
    Icon: AuthorizationIcon,
    label: "Authorization",
    path: "/authorization"
  },
  {
    id: "navigate_themes",
    Icon: ThemeIcon,
    label: "Themes"
  }
];

export const SIDEBAR_THEME_MENU_ITEMS: Array<
  SidebarMenuItemInterface & {
    shortcut?: string;
  }
> = [
  {
    id: "navigate_themes_marketplace",
    label: "Theme marketplace",
    path: "/themes/marketplace",
    Icon: ThemeMarketIcon
  },
  {
    id: "navigate_themes_editor",
    label: "Theme editor",
    path: "/themes/editor",
    Icon: ThemeEditorIcon
  }
];

export const SIDEBAR_THEME_MENU_IDS = new Set<TSidebarTab>(
  SIDEBAR_THEME_MENU_ITEMS.map(item => item.id)
);

export const HIDDEN_TABS_WHEN_NOT_PROJECT_SELECTED: Array<TSidebarTab> = [
  "navigate_collections",
  "navigate_environments",
  "navigate_authorization"
];

export const LOCAL_STORAGE_SIDEBAR_ACTIVE_TAB_KEY = "sidebar-active-tab";

export const LOCAL_STORAGE_SIDEBAR_LAST_ACTIVE_TAB_KEY =
  "sidebar-last-active-tab";

export const ALLOWED_TABS_WHEN_NO_ACTIVE_PROJECT = new Set<TSidebarTab>([
  "navigate_projects",
  "navigate_themes"
]);

export const SIDEBAR_TOGGLE_BUTTON_ALLOWED_IDS = new Set<TSidebarTab>([
  "navigate_collections",
  "navigate_themes"
]);
