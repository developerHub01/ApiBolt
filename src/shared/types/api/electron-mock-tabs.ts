import { TabsInterface } from "@shared/types/tabs";

export interface ElectronAPIMockTabsInterface {
  getMockTabList(): Promise<TabsInterface>;
  updateMockTabList(payload: Partial<TabsInterface>): Promise<boolean>;
  deleteAllMockTabList(): Promise<boolean>;
  deleteMockTabListByProjectId(id?: string): Promise<boolean>;
}
