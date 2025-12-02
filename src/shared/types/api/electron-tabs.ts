export interface ElectronAPITabsInterface {
  getTabList(): Promise<{
    openTabs: Array<string>;
    selectedTab: string | null;
  }>;
  updateTabList(payload: {
    openTabs: Array<string>;
    selectedTab: string | null;
  }): Promise<boolean>;
  deleteAllTabList(): Promise<boolean>;
  deleteTabListByProjectId(id?: string): Promise<boolean>;
}
