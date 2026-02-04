import { Button } from "@/components/ui/button";
import { ChevronDown as MoreIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ClearAllTabs from "@/components/app/tab-sidebar/ClearAllTabs";
import AddNewTab from "@/components/app/tab-sidebar/AddNewTab";
import TabSearchBar from "@/components/app/tab-sidebar/TabSearchBar";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import TabSearchResult from "@/components/app/tab-sidebar/horizontal/TabSearchResult";

const TabsModifier = () => {
  const { haveAnyTabsOpen } = useTabSidebar();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size={"icon"} className="rounded-none">
          <MoreIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-65 p-2 flex flex-col gap-2"
        side="bottom"
        align="end"
        sideOffset={5}
      >
        <AddNewTab isOpen />
        {haveAnyTabsOpen && (
          <>
            <ClearAllTabs isOpen />
            <TabSearchBar isOpen />
          </>
        )}
        <TabSearchResult />
      </PopoverContent>
      <span className="h-full w-2 bg-border"></span>
    </Popover>
  );
};

export default TabsModifier;
