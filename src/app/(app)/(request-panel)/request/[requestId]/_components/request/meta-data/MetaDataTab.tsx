"use client";

import React, { memo } from "react";
import {
  TActiveTabType,
  useRequestResponse,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import TabV1 from "@/components/tab-v1";
import SelectV1 from "@/components/select-v1";

const tabList: Array<{
  id: TActiveTabType;
  label: string;
  isActive: boolean;
}> = [
  {
    id: "params",
    label: "Params",
    isActive: true,
  },
  {
    id: "headers",
    label: "Headers",
    isActive: false,
  },
  {
    id: "body",
    label: "Body",
    isActive: true,
  },
  {
    id: "authorization",
    label: "Authorization",
    isActive: false,
  },
];

const MetaDataTab = memo(() => {
  const { activeMetaTab, handleChangeActiveMetaTab } = useRequestResponse();

  return (
    <>
      <SelectV1
        list={tabList}
        value={activeMetaTab}
        handleChange={(value) =>
          handleChangeActiveMetaTab(value as TActiveTabType)
        }
        className="block md:hidden"
      />
      <TabV1
        list={tabList}
        activeTab={activeMetaTab}
        handleSelect={(value) =>
          handleChangeActiveMetaTab(value as TActiveTabType)
        }
        className="hidden md:flex select-none"
      />
    </>
  );
});

export default MetaDataTab;
