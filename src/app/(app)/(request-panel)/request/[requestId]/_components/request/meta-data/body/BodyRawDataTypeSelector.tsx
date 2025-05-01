"use client";

import React, { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

const rawDataTypeList = [
  {
    id: "text",
    label: "Text",
  },
  {
    id: "javascript",
    label: "JavaScript",
  },
  {
    id: "json",
    label: "JSON",
  },
  {
    id: "html",
    label: "HTML",
  },
  {
    id: "xml",
    label: "XML",
  },
];

const BodyRawDataTypeSelector = memo(() => {
  const {
    requestBodyType,
    rawRequestBodyType,
    handleChangeRawRequestBodyType,
  } = useRequestBody();

  if (requestBodyType !== "raw") return null;

  return (
    <Select
      defaultValue={rawRequestBodyType ?? rawDataTypeList[0].id}
      value={rawRequestBodyType ?? rawDataTypeList[0].id}
      onValueChange={handleChangeRawRequestBodyType}
    >
      <SelectTrigger className="border-none" size="sm">
        <SelectValue placeholder="Select Raw Body Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {rawDataTypeList.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default BodyRawDataTypeSelector;
