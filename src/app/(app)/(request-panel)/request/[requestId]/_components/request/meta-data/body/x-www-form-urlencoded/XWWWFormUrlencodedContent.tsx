"use client";

import React, { memo } from "react";
import AddNew from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/AddNew";
import MetaTable from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTable";
import { useRequestMetaTable } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";

const XWWWFormUrlencodedContent = memo(() => {
  const { handleAddNewMetaData } = useRequestMetaTable();

  return (
    <>
      <MetaTable />
      <AddNew
        onClick={() => handleAddNewMetaData("x-www-form-urlencoded")}
        label="Add Form Data"
      />
    </>
  );
});

export default XWWWFormUrlencodedContent;
