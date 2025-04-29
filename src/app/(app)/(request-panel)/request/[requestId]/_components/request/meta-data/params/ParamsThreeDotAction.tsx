"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis as ThreeDotIcon, Plus as AddIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const ParamsThreeDotAction = memo(() => {
  const { handleAddNewParam } = useRequestResponse();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex justify-center items-center">
          <Button size={"iconXs"} variant={"ghost"}>
            <ThreeDotIcon />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex flex-col gap-1 p-1.5 max-w-40 select-none"
      >
        <span className="text-xs px-2 pb-1">Show columns</span>
        <div className="flex flex-col pl-3">
          <CheckItem id="params-value" label="Value" />
          <CheckItem id="params-description" label="Description" />
        </div>
        <Button size={"sm"} variant={"ghost"} onClick={handleAddNewParam}>
          <AddIcon /> Add New Params
        </Button>
      </PopoverContent>
    </Popover>
  );
});

interface CheckItemProps {
  id: string;
  label: string;
}

const CheckItem = ({ id, label }: CheckItemProps) => {
  return (
    <Label
      htmlFor={id}
      className="w-full flex items-center gap-2 hover:bg-accent p-2 rounded-md cursor-pointer"
    >
      <Checkbox id={id} className="cursor-pointer" />
      <p className="pb-0.5">{label}</p>
    </Label>
  );
};

export default ParamsThreeDotAction;
