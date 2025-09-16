export type TSidebarTab =
  | "projects"
  | "collections"
  | "environments"
  | "authorization"
  | "theme-builder"
  | null;

export interface SidebarState {
  activeTab: TSidebarTab;
  lastActiveTab: TSidebarTab;
}
