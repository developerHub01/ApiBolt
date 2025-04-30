"use client";

import React, { memo } from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import BodyResponse from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyResponse";
import BodyPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/BodyPreview";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const BodyContent = memo(() => {
  const { responseTab } = useResponse();

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden">
      {responseTab === "raw" && <BodyResponse />}
      {responseTab === "preview" && <BodyPreview />}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

export default BodyContent;
