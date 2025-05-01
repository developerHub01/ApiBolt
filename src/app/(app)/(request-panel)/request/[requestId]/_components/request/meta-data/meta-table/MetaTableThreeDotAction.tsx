"use client";

import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Ellipsis as ThreeDotIcon,
  Plus as AddIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ShowColumnInterface,
  TMetaTableType,
  useRequestMetaTable,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";

interface MetaTableThreeDotActionProps {
  type: TMetaTableType;
}

const MetaTableThreeDotAction = memo(
  ({ type }: MetaTableThreeDotActionProps) => {
    const { showColumn, toggleShowColumn, handleAddNewMetaData } =
      useRequestMetaTable();

    const handleAddNewData = useCallback(
      () => handleAddNewMetaData(type),
      [type]
    );

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
              type={type}
              id="value"
              label="Value"
              value={showColumn.value}
              onChange={toggleShowColumn}
            />
            {type === "form-data" && showColumn.contentType !== undefined && (
              <CheckItem
                type={type}
                id="contentType"
                label="Content-Type"
                value={showColumn.contentType}
                onChange={toggleShowColumn}
              />
            )}
            <CheckItem
              type={type}
              id="description"
              label="Description"
              value={showColumn.description}
              onChange={toggleShowColumn}
            />
          </div>
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={handleAddNewData}
            className="justify-start"
          >
            <AddIcon /> Add New
          </Button>
        </PopoverContent>
      </Popover>
    );
  }
);

interface CheckItemProps {
  type: TMetaTableType;
  id: keyof ShowColumnInterface;
  label: string;
  value: boolean;
  onChange: (id: keyof ShowColumnInterface) => void;
}

const CheckItem = ({ type, id, label, value, onChange }: CheckItemProps) => {
  return (
    <Label
      htmlFor={`${type}-${id}`}
      className="w-full flex items-center gap-2 hover:bg-accent p-2 rounded-md cursor-pointer"
    >
      <Checkbox
        id={`${type}-${id}`}
        checked={value}
        className="cursor-pointer"
        onCheckedChange={() => onChange(id)}
      />
      <p className="pb-0.5">{label}</p>
    </Label>
  );
};

export default MetaTableThreeDotAction;
