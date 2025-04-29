"use client";

import { cn } from "@/lib/utils";
import React, { ChangeEvent, FocusEvent, memo, useCallback } from "react";

interface ParamInputProps {
  id: string;
  value?: string;
  onChange: (key: string, value: string) => void;
  onBlur: (id: string, key: string) => void;
  className?: string;
}

const ParamInput = memo(
  ({ id, value = "", onChange, onBlur, className = "" }: ParamInputProps) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.dataset.paramType) return;

        onChange(e.target.dataset.paramType, e.target.value);
      },
      [onChange]
    );
    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (!e.target.dataset.paramType) return;

        onBlur(id, e.target.dataset.paramType);
      },
      [onBlur]
    );

    return (
      <input
        type="text"
        data-param-type={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn("w-full p-0.5", "focus:bg-background", className)}
      />
    );
  }
);

export default ParamInput;
