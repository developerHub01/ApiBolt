export type TSidebarTab =
  | "projects"
  | "collections"
  | "environments"
  | "authorization"
  | null;

export interface SidebarState {
  activeTab: TSidebarTab;
}
