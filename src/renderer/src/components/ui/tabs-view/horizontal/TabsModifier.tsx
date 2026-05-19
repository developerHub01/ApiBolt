import { Button } from "@/components/ui/button";
import { ChevronDown as MoreIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";
import TabsView from "@/components/ui/tabs-view/TabsView";
import { Plus as AddIcon, Trash2 as ClearIcon } from "lucide-react";

const TabsModifier = () => {
  const { haveAnyTabsOpen, handleAdd, handleClearAllTabs } = useTabsView();

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
        <TabsView.BottomCTA
          isOpen={true}
          onClick={handleAdd}
          Icon={AddIcon}
          label="Add Tab"
        />
        {haveAnyTabsOpen && (
          <>
            <TabsView.BottomCTA
              isOpen={true}
              onClick={handleClearAllTabs}
              Icon={ClearIcon}
              label="Clear Tabs"
            />
            <TabsView.SearchBar isOpen />
          </>
        )}
        <TabsView.SearchResult />
      </PopoverContent>
      <span className="h-full w-2 bg-border"></span>
    </Popover>
  );
};

export default TabsModifier;
