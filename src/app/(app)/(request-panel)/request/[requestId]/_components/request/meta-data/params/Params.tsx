import React from "react";
import ParamList from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamList";

const Params = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-foreground text-sm select-none">Query Params</p>
      <ParamList />
    </div>
  );
};

export default Params;
