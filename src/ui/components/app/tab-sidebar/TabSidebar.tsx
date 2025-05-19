import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus as AddIcon } from "lucide-react";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import TabItem from "@/components/app/tab-sidebar/TabItem";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const TabSidebar = () => {
  return (
    <>
      <TabSidebarContent />
    </>
  );
};

const TabSidebarContent = () => {
  const { tabListState, isTabListHovering, handleTabListHovering } =
    useTabSidebar();

  return (
    <div
      className="w-12 bg-background relative"
      onMouseEnter={() => handleTabListHovering(true)}
      onMouseLeave={() => handleTabListHovering(false)}
    >
      <motion.div
        initial={{ width: 48 }}
        animate={{ width: isTabListHovering ? 280 : 48 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full flex flex-col absolute right-0 top-0 bg-background gap-2 shadow-2xl border-l border-muted-foreground/20"
        )}
      >
        <ScrollArea className="w-full h-full min-h-0 flex-1 pt-2 pb-0">
          <div className="w-full flex flex-col gap-1 pb-1">
            {tabListState.map((tabId) => (
              <TabItem id={tabId} />
            ))}
          </div>
        </ScrollArea>
        <div className="p-2 pt-0">
          <Button
            variant={"secondary"}
            size={"sm"}
            className={cn("w-full gap-0", {
              "justify-start": isTabListHovering,
              "justify-center": !isTabListHovering,
            })}
          >
            <AddIcon />
            <motion.span
              className="transition-all duration-300 text-left"
              style={{ transformOrigin: "left" }}
              animate={{
                opacity: isTabListHovering ? 1 : 0,
                width: isTabListHovering ? "100%" : "0px",
                paddingLeft: isTabListHovering ? "8px" : "0px",
                scaleX: isTabListHovering ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              Add Tab
            </motion.span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TabSidebar;
