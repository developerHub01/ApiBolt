"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import AddNew from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/AddNew";

const AddNewParam = memo(() => {
  const { handleAddNewParam } = useRequestResponse();

  return <AddNew onClick={handleAddNewParam} label="Add New Param" />;
});

export default AddNewParam;
