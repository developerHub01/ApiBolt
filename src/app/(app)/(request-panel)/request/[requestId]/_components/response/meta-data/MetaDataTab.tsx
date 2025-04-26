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
      <div className="hidden md:flex items-center gap-4">
        {tabList.map(({ id, label }) => (
          <Button
            key={id}
            size={"sm"}
            variant={"link"}
            className={cn("px-0 underline-offset-8", {
              "underline text-primary": activeMetaTab === id,
              "no-underline text-foreground/70 hover:text-foreground hover:no-underline":
                activeMetaTab !== id,
            })}
            onClick={() => handleChangeActiveMetaTab(id)}
          >
            {label}
          </Button>
        ))}
      </div>
    </>
  );
});

export default MetaDataTab;
