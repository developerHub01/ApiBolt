import { ComponentProps, lazy, memo } from "react";
import TabsViewProvider, {
  useTabsView,
} from "@/context/tabs-view/TabsViewProvider";
import TabsItemProvider from "@/context/tabs-view/TabsItemProvider";
import TabsXSidebar from "@/components/ui/tabs-view/horizontal/TabsHorizontalSidebar";
import TabsYSidebar from "@/components/ui/tabs-view/vertical/TabsVerticalSidebar";
import TabsModifier from "@/components/ui/tabs-view/horizontal/TabsModifier";
import XTabsList from "@/components/ui/tabs-view/horizontal/TabsList";
import TabsSearchResult from "@/components/ui/tabs-view/horizontal/TabsSearchResult";
import XTabsItem from "@/components/ui/tabs-view/horizontal/TabsItem";
import YTabsItem from "@/components/ui/tabs-view/vertical/TabsItem";
import TabsSidebarContextMenuWrapper from "@/components/ui/tabs-view/TabsSidebarContextMenuWrapper";
import TabsSearchBar from "@/components/ui/tabs-view/TabsSearchBar";
import TabsListAutoScrollWrapper from "@/components/ui/tabs-view/vertical/TabsListAutoScrollWrapper";
import TabsActionWrapper from "@/components/ui/tabs-view/vertical/TabsActionWrapper";
import TabsBottomCTA from "@/components/ui/tabs-view/TabsBottomCTA";
import NoTabOpenEmptyBox from "@/components/ui/tabs-view/vertical/empty/NoTabOpenEmptyBox";
import NoTabSearchResultEmptyBox from "@/components/ui/tabs-view/vertical/empty/NoTabSearchResultEmptyBox";
import TabCloseButton from "@/components/ui/tabs-view/TabCloseButton";
import TabShortcutText from "@/components/ui/tabs-view/TabShortcutText";
import TabType from "@/components/ui/tabs-view/TabType";
const TabsSidebarRoot = lazy(
  () => import("@/components/ui/tabs-view/vertical/TabsSidebarRoot"),
);

interface Props {
  children: ComponentProps<"div">["children"];
}

const TabsViewBase = memo(({ children }: Props) => {
  const { layoutTypes, tabListLayoutType } = useTabsView();

  return (
    <>
      {tabListLayoutType === "top" ? (
        <section className="w-full flex flex-col">
          <TabsView.XSidebar />
          <section className="w-full flex-1">{children}</section>
        </section>
      ) : (
        <>
          {layoutTypes === "rtl" && <TabsView.YSidebar />}
          {children}
          {layoutTypes === "ltr" && <TabsView.YSidebar />}
        </>
      )}
    </>
  );
});

type TabsViewType = typeof TabsViewBase & {
  Provider: typeof TabsViewProvider;
  ItemProvider: typeof TabsItemProvider;
  XSidebar: typeof TabsXSidebar;
  YSidebar: typeof TabsYSidebar;
  Modifier: typeof TabsModifier;
  XList: typeof XTabsList;
  SearchResult: typeof TabsSearchResult;
  XTabsItem: typeof XTabsItem;
  YTabsItem: typeof YTabsItem;
  ContextMenuWrapper: typeof TabsSidebarContextMenuWrapper;
  SearchBar: typeof TabsSearchBar;
  ListAutoScrollWrapper: typeof TabsListAutoScrollWrapper;
  XActionWrapper: typeof TabsActionWrapper;
  BottomCTA: typeof TabsBottomCTA;
  NoTabOpenEmptyBox: typeof NoTabOpenEmptyBox;
  NoTabSearchResultEmptyBox: typeof NoTabSearchResultEmptyBox;
  YRoot: typeof TabsSidebarRoot;
  CloseButton: typeof TabCloseButton;
  ShortcutText: typeof TabShortcutText;
  Type: typeof TabType;
};

const TabsView = TabsViewBase as TabsViewType;
TabsView.Provider = TabsViewProvider;
TabsView.ItemProvider = TabsItemProvider;
TabsView.XSidebar = TabsXSidebar;
TabsView.YSidebar = TabsYSidebar;
TabsView.Modifier = TabsModifier;
TabsView.XList = XTabsList;
TabsView.XTabsItem = XTabsItem;
TabsView.YTabsItem = YTabsItem;
TabsView.SearchResult = TabsSearchResult;
TabsView.ContextMenuWrapper = TabsSidebarContextMenuWrapper;
TabsView.SearchBar = TabsSearchBar;
TabsView.ListAutoScrollWrapper = TabsListAutoScrollWrapper;
TabsView.XActionWrapper = TabsActionWrapper;
TabsView.BottomCTA = TabsBottomCTA;
TabsView.NoTabOpenEmptyBox = NoTabOpenEmptyBox;
TabsView.NoTabSearchResultEmptyBox = NoTabSearchResultEmptyBox;
TabsView.YRoot = TabsSidebarRoot;
TabsView.CloseButton = TabCloseButton;
TabsView.ShortcutText = TabShortcutText;
TabsView.Type = TabType;

export default TabsView;
