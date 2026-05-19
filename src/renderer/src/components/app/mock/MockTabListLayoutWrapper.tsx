import React, { memo } from "react";
import useCheckApplyingTabListLayoutDirection from "@/hooks/setting/use-check-applying-tab-list-layout-direction";
import { TLayoutSetting } from "@shared/types/setting.types";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";
import TabsView from "@/components/ui/tabs-view/TabsView";
import { useMockTabSidebar } from "@/context/tab-sidebar/MockTabSidebarProvider";

interface Props {
  children: React.ReactNode;
}

const MockTabListLayoutWrapper = memo(({ children }: Props) => {
  const tabListLayoutType = useCheckApplyingTabListLayoutDirection();
  const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();
  const {
    handleAdd,
    handleClearAllTabs,
    isCollapsed,
    selectedTab,
    tabList,
    requestList,
    handleChangeTabsData,
    handleLoadsTabsData,
    handleMoveTabInIndex,
    handleRemove,
    handleChangeSelectedTab,
    handleExpendParentsOnSelectedChangeTabsData,
    handleToggleTabsCollapse,
    handleAddNewtabsToLeftOrRight,
  } = useMockTabSidebar();

  return (
    <TabsView.Provider
      selectedTab={selectedTab}
      tabListLayoutType={tabListLayoutType}
      layoutTypes={layoutTypes}
      handleAdd={handleAdd}
      handleClearAllTabs={handleClearAllTabs}
      isCollapsed={isCollapsed}
      tabList={tabList}
      requestList={requestList}
      handleChangeTabsData={handleChangeTabsData}
      handleLoadTabsData={handleLoadsTabsData}
      handleMoveTab={handleMoveTabInIndex}
      handleRemove={handleRemove}
      handleChangeSelectedTab={handleChangeSelectedTab}
      handleExpendParentsOnSelectedChangeTabsData={
        handleExpendParentsOnSelectedChangeTabsData
      }
      handleAddNewtabsToLeftOrRight={handleAddNewtabsToLeftOrRight}
      noTabsOpenEmptyContent={{
        label: "No tab open",
        description:
          "Your currently tab list is empty. You can start by selecting a request or folder or clicking on the '+' add button to add new tab.",
      }}
      noTabsSearchResultEmptyContent={{
        label: "No tab found",
        description: "No tabs found with search term",
      }}
      handleToggleTabsCollapse={handleToggleTabsCollapse}
    >
      <TabsView>{children}</TabsView>
    </TabsView.Provider>
  );
});

export default MockTabListLayoutWrapper;
