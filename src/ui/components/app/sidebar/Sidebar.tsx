import { TooltipProvider } from "@/components/ui/tooltip";
import SidebarMenu from "@/components/app/sidebar/SidebarMenu";
import FullScreenToggle from "@/components/app/sidebar/FullScreenToggle";
import ThemeToggle from "@/components/app/sidebar/ThemeToggle";
import SidbarToggle from "@/components/app/sidebar/SidbarToggle";
import { cn } from "@/lib/utils";
import useCheckApplyingLayout from "@/hooks/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";

const Sidebar = () => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <TooltipProvider>
      <div
        className={cn(
          "max-w-16 py-2.5 px-2 flex flex-col gap-2.5 justify-between items-center",
          {
            "border-r-2": layoutTypes !== "rtl",
            "border-l-2": layoutTypes === "rtl",
          }
        )}
      >
        <div className="flex flex-col gap-2">
          <SidebarMenu />
          <ThemeToggle />
        </div>
        <div className="flex flex-col gap-2">
          <SidbarToggle />
          <FullScreenToggle />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
