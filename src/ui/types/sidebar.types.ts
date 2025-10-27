export type TSidebarTab =
  | "navigate_projects"
  | "navigate_collections"
  | "navigate_environments"
  | "navigate_authorization"
  | null;

export interface SidebarState {
  activeTab: TSidebarTab;
}
