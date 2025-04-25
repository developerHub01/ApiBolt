"use client";

import { Button } from "@/components/ui/button";
import React, { memo } from "react";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";
import { cn } from "@/lib/utils";

const dataList = [
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
  const { activeMetaTab, handleChangeActiveMetaTab } = useRequest();

  return (
    <div className="flex items-center gap-3">
      {dataList.map(({ id, label }) => (
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
  );
});

export default MetaDataTab;
