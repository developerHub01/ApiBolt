import { TooltipProvider } from "@/components/ui/tooltip";
import SidebarMenu from "@/components/app/sidebar/SidebarMenu";
import FullScreenToggle from "@/components/app/sidebar/FullScreenToggle";
import ThemeToggle from "@/components/app/sidebar/ThemeToggle";

const Sidebar = () => {
  return (
    <TooltipProvider>
      <div className="max-w-16 border-r-2 py-2.5 px-2 flex flex-col gap-2.5">
        <SidebarMenu />
        <FullScreenToggle />
        <ThemeToggle />
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
