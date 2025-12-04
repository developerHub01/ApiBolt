import { TSidebarTab } from "@/shared/types/sidebar.types";

export interface ElectronAPIActiveSidebarTabInterface {
  getActiveSidebarTab(): Promise<TSidebarTab>;
  createActiveSidebarTab(tab?: TSidebarTab | null): Promise<boolean>;
  updateActiveSidebarTab(tab: TSidebarTab): Promise<boolean>;
  deleteActiveSidebarTab(): Promise<boolean>;
}
