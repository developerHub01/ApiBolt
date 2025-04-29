"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import AddNew from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/AddNew";

const AddNewHeader = memo(() => {
  const { handleAddNewHeader } = useRequestResponse();

  return <AddNew onClick={handleAddNewHeader} label="Add New Param" />;
});

export default AddNewHeader;
