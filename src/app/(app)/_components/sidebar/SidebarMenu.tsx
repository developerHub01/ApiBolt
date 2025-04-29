"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Boxes as CollectionsIcon,
  Container as EnvironmentsIcon,
  LucideIcon,
} from "lucide-react";
import { TSidebarTab, useSidebar } from "@/app/(app)/_context/SidebarProvider";

const menuList: Array<{
  id: TSidebarTab;
  Icon: LucideIcon;
  label: string;
}> = [
  {
    id: "collections",
    Icon: CollectionsIcon,
    label: "Collections",
  },
  {
    id: "environments",
    Icon: EnvironmentsIcon,
    label: "Environments",
  },
];

const SidebarMenu = memo(() => {
  const { activeTab, handleChangeActiveTab } = useSidebar();

  return (
    <div className="flex flex-col gap-2">
      {menuList.map(({ id, Icon, label }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={activeTab === id ? "default" : "outline"}
              onClick={() => handleChangeActiveTab(id)}
              className="mt-auto"
            >
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
});

export default SidebarMenu;
