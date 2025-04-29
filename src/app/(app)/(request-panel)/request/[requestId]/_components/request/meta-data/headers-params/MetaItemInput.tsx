"use client";

import { cn } from "@/lib/utils";
import React, { ChangeEvent, FocusEvent, memo, useCallback } from "react";

interface MetaItemInputProps {
  id: string;
  value?: string;
  onChange: (key: string, value: string) => void;
  onBlur: (id: string, key: string) => void;
  className?: string;
}

const MetaItemInput = memo(
  ({
    id,
    value = "",
    onChange,
    onBlur,
    className = "",
  }: MetaItemInputProps) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.dataset.metaItemType) return;

        onChange(e.target.dataset.metaItemType, e.target.value);
      },
      [onChange]
    );
    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (!e.target.dataset.metaItemType) return;

        onBlur(id, e.target.dataset.metaItemType);
      },
      [onBlur]
    );

    return (
      <input
        type="text"
        data-meta-item-type={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn("w-full p-0.5", "focus:bg-background", className)}
      />
    );
  }
);

export default MetaItemInput;
