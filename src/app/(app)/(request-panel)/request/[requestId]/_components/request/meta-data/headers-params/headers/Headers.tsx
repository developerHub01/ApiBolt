"use client";

import React, { memo } from "react";
import MetaDataWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaDataWrapper";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import AddNew from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/AddNew";
import MetaTable from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTable";

const Headers = memo(() => {
  const { handleAddNewHeader } = useRequestResponse();

  return (
    <MetaDataWrapper label="Headers">
      <MetaTable />
      <AddNew onClick={handleAddNewHeader} label="Add New Param" />
    </MetaDataWrapper>
  );
});

export default Headers;
