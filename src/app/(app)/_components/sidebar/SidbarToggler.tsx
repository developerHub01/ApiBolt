"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { useSidebar } from "@/app/(app)/_context/SidebarProvider";

const SidbarToggler = memo(() => {
  const { handleToggleSidebar } = useSidebar();

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleToggleSidebar}>
      <MenuIcon />
    </Button>
  );
});

export default SidbarToggler;
