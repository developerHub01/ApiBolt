import { AnimatePresence, motion } from "motion/react";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";
import { Plus as AddIcon, Trash2 as ClearIcon } from "lucide-react";
import { LockIcon, UnlockIcon } from "@/icons";
import TabsView from "@/components/ui/tabs-view/TabsView";

const TabsActionWrapper = () => {
  const {
    tabList,
    haveAnyTabsOpen,
    isTabListOpen,
    isCollapsed,
    handleAdd,
    handleClearAllTabs,
    handleToggleTabsCollapse,
  } = useTabsView();

  return (
    <div className="w-full flex flex-col p-2 gap-2">
      {haveAnyTabsOpen && (
        <AnimatePresence>
          {Boolean(tabList?.length) && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              exit={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                type: "spring",
                ease: "anticipate",
              }}
            >
              <TabsView.SearchBar />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <TabsView.BottomCTA
        isOpen={isTabListOpen}
        onClick={handleAdd}
        Icon={AddIcon}
        label="Add Tab"
      />
      {haveAnyTabsOpen && (
        <TabsView.BottomCTA
          isOpen={isTabListOpen}
          onClick={handleClearAllTabs}
          Icon={ClearIcon}
          label="Clear Tabs"
        />
      )}
      <TabsView.BottomCTA
        isOpen={isTabListOpen}
        onClick={handleToggleTabsCollapse}
        Icon={isCollapsed ? UnlockIcon : LockIcon}
        label={`${isCollapsed ? "Unlock" : "Lock"} Collapsed`}
      />
    </div>
  );
};

export default TabsActionWrapper;
