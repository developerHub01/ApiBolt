import type { LucideIcon } from "lucide-react";

export type TSidebarTab =
  | "navigate_projects"
  | "navigate_collections"
  | "navigate_environments"
  | "navigate_authorization"
  | "navigate_themes"
  | "navigate_themes_marketplace"
  | "navigate_themes_editor"
  | null;

export interface SidebarState {
  activeTab: TSidebarTab;
}

export interface SidebarMenuItemInterface {
  id: Exclude<TSidebarTab, null>;
  Icon: LucideIcon;
  label: string;
  path?: string;
}
