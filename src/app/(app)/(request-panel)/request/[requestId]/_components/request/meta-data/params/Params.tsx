import React, { memo } from "react";
import ParamList from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamList";
import AddNewParam from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/AddNewParam";
import { ScrollArea } from "@/components/ui/scroll-area";

const Params = memo(() => {
  return (
    <ScrollArea className="h-full">
      <div className="h-full flex flex-col gap-3">
        <p className="text-foreground text-sm select-none">Query Params</p>
        <ParamList />
        <AddNewParam />
      </div>
    </ScrollArea>
  );
});

export default Params;
