"use client";

import React, { memo } from "react";
import { useSidebar } from "@/app/(app)/_context/SidebarProvider";

const RequestListPanelContent = memo(() => {
  const { activeTab } = useSidebar();

  return <div>{activeTab}</div>;
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
