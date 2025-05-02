"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TRequestBodyType,
  useRequestBody,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

const bodyList: Array<{
  id: TRequestBodyType;
  label: string;
}> = [
  {
    id: "none",
    label: "none",
  },
  {
    id: "form-data",
    label: "form-data",
  },
  {
    id: "x-www-form-urlencoded",
    label: "x-www-form-urlencoded",
  },
  {
    id: "raw",
    label: "raw",
  },
  {
    id: "binary",
    label: "binary",
  },
];

const BodyTypeSelector = () => {
  const { requestBodyType, handleChangeRequestBodyType } = useRequestBody();

  return (
    <>
      <div className="block md:hidden">
        <Select
          defaultValue={requestBodyType ?? bodyList[0].id}
          value={requestBodyType ?? bodyList[0].id}
          onValueChange={handleChangeRequestBodyType}
        >
          <SelectTrigger className="min-w-[120px]" size="sm">
            <SelectValue placeholder="Select body type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {bodyList.map(({ id, label }) => (
                <SelectItem key={id} value={id}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <RadioGroup
        defaultValue={requestBodyType ?? bodyList[0].id}
        value={requestBodyType ?? bodyList[0].id}
        onValueChange={handleChangeRequestBodyType}
        className="hidden md:flex items-center flex-wrap gap-3"
      >
        {bodyList.map(({ id, label }) => (
          <Label
            key={id}
            htmlFor={id}
            className="whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer [&>button]:cursor-pointer"
          >
            <RadioGroupItem value={id} id={id} />
            <p className="pb-1">{label}</p>
          </Label>
        ))}
      </RadioGroup>
    </>
  );
};

export default BodyTypeSelector;
