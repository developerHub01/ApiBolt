import { TooltipProvider } from "@/components/ui/tooltip-custom";
import SidebarMenu from "@/components/app/sidebar/SidebarMenu";
import FullScreenToggle from "@/components/app/sidebar/FullScreenToggle";
import SidbarToggle from "@/components/app/sidebar/SidbarToggle";
import { cn } from "@/lib/utils";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";
import type { TLayoutSetting } from "@shared/types/setting.types";
import SidebarContextMenuWrapper from "@/components/app/sidebar/SidebarContextMenuWrapper";
import useCheckApplyingLayoutActivityBarVisible from "@/hooks/setting/use-check-applying-layout-activity-bar-visible";
import { AnimatePresence, motion } from "motion/react";

const Sidebar = () => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();
  const isActivityBarVisible = useCheckApplyingLayoutActivityBarVisible();

  return (
    <AnimatePresence>
      {isActivityBarVisible && (
        <motion.div
          initial={{
            x: "-100%",
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "-100%",
          }}
          transition={{
            duration: 0.4,
            ease: "anticipate",
          }}
        >
          <SidebarContextMenuWrapper>
            <TooltipProvider>
              <div
                className={cn(
                  "max-w-16 shrink-0 py-2.5 px-2 flex flex-col gap-2.5 justify-between items-center h-full bg-accent/50 backdrop-blur-sm",
                  {
                    "border-r-2": layoutTypes !== "rtl",
                    "border-l-2": layoutTypes === "rtl",
                  },
                )}
              >
                <SidebarMenu />
                <div className="flex flex-col gap-2">
                  <SidbarToggle />
                  <FullScreenToggle />
                </div>
              </div>
            </TooltipProvider>
          </SidebarContextMenuWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
