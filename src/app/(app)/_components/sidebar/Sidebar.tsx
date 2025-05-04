import React from "react";
import ThemeToggle from "@/app/(app)/_components/sidebar/theme/ThemeToggle";
import Logo from "@/app/(app)/_components/sidebar/Logo";
import { TooltipProvider } from "@/components/ui/tooltip";
import SidebarMenu from "@/app/(app)/_components/sidebar/SidebarMenu";
import SidbarToggler from "@/app/(app)/_components/sidebar/SidbarToggler";
import FullScreenToggle from "@/app/(app)/_components/sidebar/FullScreenToggle";

const Sidebar = () => {
  return (
    <TooltipProvider>
      <div className="max-w-16 bg-background border-r-2 py-2.5 px-2 flex flex-col gap-2.5">
        <Logo />
        <SidbarToggler />
        <SidebarMenu />
        <FullScreenToggle />
        <ThemeToggle />
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
