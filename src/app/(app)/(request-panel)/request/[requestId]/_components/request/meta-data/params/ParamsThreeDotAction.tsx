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
import {
  ShowColumnInterface,
  useRequestParamsHeaders,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestParamsHeadersProvider";

const ParamsThreeDotAction = memo(() => {
  const { handleAddNewParam } = useRequestResponse();
  const { showColumn, toggleShowColumn } = useRequestParamsHeaders();

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
          <CheckItem
            id="value"
            label="Value"
            value={showColumn.value}
            onChange={toggleShowColumn}
          />
          <CheckItem
            id="description"
            label="Description"
            value={showColumn.description}
            onChange={toggleShowColumn}
          />
        </div>
        <Button size={"sm"} variant={"ghost"} onClick={handleAddNewParam}>
          <AddIcon /> Add New Params
        </Button>
      </PopoverContent>
    </Popover>
  );
});

interface CheckItemProps {
  id: keyof ShowColumnInterface;
  label: string;
  value: boolean;
  onChange: (id: keyof ShowColumnInterface) => void;
}

const CheckItem = ({ id, label, value, onChange }: CheckItemProps) => {
  return (
    <Label
      htmlFor={`params-${id}`}
      className="w-full flex items-center gap-2 hover:bg-accent p-2 rounded-md cursor-pointer"
    >
      <Checkbox
        id={`params-${id}`}
        checked={value}
        className="cursor-pointer"
        onCheckedChange={() => onChange(id)}
      />
      <p className="pb-0.5">{label}</p>
    </Label>
  );
};

export default ParamsThreeDotAction;
