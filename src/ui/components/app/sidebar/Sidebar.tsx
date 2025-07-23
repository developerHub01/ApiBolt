import { TooltipProvider } from "@/components/ui/tooltip";
import SidebarMenu from "@/components/app/sidebar/SidebarMenu";
import FullScreenToggle from "@/components/app/sidebar/FullScreenToggle";
import ThemeToggle from "@/components/app/sidebar/ThemeToggle";
import SidbarToggle from "@/components/app/sidebar/SidbarToggle";

const Sidebar = () => {
  return (
    <TooltipProvider>
      <div className="max-w-16 border-r-2 py-2.5 px-2 flex flex-col gap-2.5 justify-between items-center">
        <div className="flex flex-col gap-2">
          <SidebarMenu />
          <ThemeToggle />
        </div>
        <div className="flex flex-col gap-2">
          <FullScreenToggle />
          <SidbarToggle />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
