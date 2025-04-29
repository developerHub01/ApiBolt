"use client";

import React, { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface MetaDataListCheckAllProps {
  id?: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const MetaDataListCheckAll = memo(
  ({
    id = "",
    checked,
    onChange,
    className = "",
  }: MetaDataListCheckAllProps) => {
    return (
      <div className={cn("w-full flex justify-center items-center", className)}>
        <Checkbox
          id={id}
          className="cursor-pointer"
          checked={checked}
          onCheckedChange={() => onChange()}
        />
      </div>
    );
  }
);

export default MetaDataListCheckAll;
