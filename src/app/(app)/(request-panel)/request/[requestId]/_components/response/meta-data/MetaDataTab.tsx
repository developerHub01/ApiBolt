"use client";

import React, { memo } from "react";
import { useResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";

const tabList = [
  {
    id: "body",
    label: "Body",
  },
  {
    id: "cookies",
    label: "Cookies",
  },
  {
    id: "headers",
    label: "Headers",
  },
];

const MetaDataTab = memo(() => {
  const { activeMetaTab, handleChangeActiveMetaTab } = useResponse();

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
MetaDataTab.displayName = "MetaData tab";

export default MetaDataTab;
