"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface SelectV1Props {
  list: Array<{
    id: string;
    label: string;
  }>;
  value: string;
  handleChange: (id: string) => void;
  className?: string;
}

const SelectV1 = ({ list, value, handleChange, className }: SelectV1Props) => {
  return (
    <div className={cn("select-none", className)}>
      <Select
        defaultValue={value ?? list[0].id}
        value={value ?? list[0].id}
        onValueChange={handleChange}
      >
        <SelectTrigger className="min-w-[120px]">
          <SelectValue placeholder="Select Tab" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {list.map(({ id, label }) => (
              <SelectItem key={id} value={id}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectV1;
