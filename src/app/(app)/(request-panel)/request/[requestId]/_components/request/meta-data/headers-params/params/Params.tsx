import React, { memo } from "react";
import ParamList from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/params/ParamList";
import AddNewParam from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/params/AddNewParam";
import MetaDataWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataWrapper";

const Params = memo(() => {
  return (
    <MetaDataWrapper>
      <p className="text-foreground text-sm select-none">Query Params</p>
      <ParamList />
      <AddNewParam />
    </MetaDataWrapper>
  );
});

export default Params;
