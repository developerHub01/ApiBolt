"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TabV1 from "@/components/tab-v1";

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
      <div className="block md:hidden">
        <Select
          defaultValue={activeMetaTab ?? tabList[0].id}
          value={activeMetaTab ?? tabList[0].id}
          onValueChange={handleChangeActiveMetaTab}
        >
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Select Tab" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tabList.map(({ id, label }) => (
                <SelectItem key={id} value={id}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
