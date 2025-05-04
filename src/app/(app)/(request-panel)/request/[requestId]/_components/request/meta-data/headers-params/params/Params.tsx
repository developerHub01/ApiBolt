"use client";

import React, { memo } from "react";
import MetaDataWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaDataWrapper";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import AddNew from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/AddNew";
import MetaTable from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTable";

const Params = memo(() => {
  const { handleAddNewParam } = useRequestResponse();

  return (
    <MetaDataWrapper label="Query Params">
      <MetaTable />
      <AddNew onClick={handleAddNewParam} label="Add New Param" />
    </MetaDataWrapper>
  );
});
Params.displayName = "Params";

export default Params;
