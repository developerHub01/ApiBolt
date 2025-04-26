"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";

const tabList = [
  {
    id: "params",
    label: "Params",
  },
  {
    id: "authorization",
    label: "Authorization",
  },
  {
    id: "headers",
    label: "Headers",
  },
  {
    id: "body",
    label: "Body",
  },
];

const MetaDataTab = memo(() => {
  const { activeMetaTab, handleChangeActiveMetaTab } = useRequestResponse();

  return (
    <>
      <SelectV1
        list={tabList}
        value={activeMetaTab}
        handleChange={handleChangeActiveMetaTab}
        className="block md:hidden"
      />
      <TabV1
        list={tabList}
        activeTab={activeMetaTab}
        handleSelect={handleChangeActiveMetaTab}
        className="hidden md:flex"
      />
    </>
  );
});

export default MetaDataTab;
