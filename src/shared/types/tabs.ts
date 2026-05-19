export interface TabsInterface {
  openTabs: Array<string>;
  selectedTab: string | null;
}

export type TTabsRemoveType = "current" | "others" | "all-left" | "all-right";
export type TTabsAddNewTOLeftOrRightType = "left" | "right";
