import { memo, useCallback } from "react";
import { ApiBoltResizableLeftPanel } from "@/components/ui/api-bolt-resizable";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleThemeListCollapsed } from "@/context/redux/theme/theme-slice";
import { selectIsThemeListCollapsed } from "@/context/redux/theme/selectors/theme";
import ThemeList from "@/components/app/themes/marketplace/[id]/theme-list/ThemeList";
import ThemeListTop from "@/components/app/themes/marketplace/[id]/theme-list/ThemeListTop";

const ThemeListPanelWrapper = memo(() => {
  const dispath = useAppDispatch();
  const isCollapsed = useAppSelector(selectIsThemeListCollapsed);

  const handleCollapse = useCallback(
    () => dispath(handleToggleThemeListCollapsed(true)),
    [dispath]
  );

  return (
    <ApiBoltResizableLeftPanel
      isCollapsed={isCollapsed}
      handleCollapse={handleCollapse}
      style={{
        maxWidth: "50vw",
      }}
      minSize={25}
      defaultSize={45}
    >
      <div className="w-full flex flex-col h-full gap-1">
        <ThemeListTop />
        <ThemeList />
      </div>
    </ApiBoltResizableLeftPanel>
  );
});

export default ThemeListPanelWrapper;
