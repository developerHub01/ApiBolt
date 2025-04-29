import React, { memo } from "react";
import ParamList from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamList";
import AddNewParam from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/AddNewParam";

const Params = memo(() => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-foreground text-sm select-none">Query Params</p>
      <ParamList />
      <AddNewParam />
    </div>
  );
});

export default Params;
