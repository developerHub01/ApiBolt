import { TabsInterface } from "@shared/types/tabs";

export interface ElectronAPITabsInterface {
  getTabList(): Promise<TabsInterface>;
  updateTabList(payload: Partial<TabsInterface>): Promise<boolean>;
  deleteAllTabList(): Promise<boolean>;
  deleteTabListByProjectId(id?: string): Promise<boolean>;
}
