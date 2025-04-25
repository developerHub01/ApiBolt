"use client";

import React, { memo } from "react";
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
import { useRequestBody } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

const bodyList = [
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

const Body = memo(() => {
  const { requestBodyType, handleChangeRequestBodyType } = useRequestBody();

  return (
    <>
      <div className="block md:hidden">
        <Select
          defaultValue={requestBodyType ?? bodyList[0].id}
          onValueChange={handleChangeRequestBodyType}
        >
          <SelectTrigger className="min-w-[120px]">
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
        onValueChange={handleChangeRequestBodyType}
        className="hidden md:flex items-center gap-3"
      >
        {bodyList.map(({ id, label }) => (
          <div
            key={id}
            className="flex items-center justify-center gap-2 [&>label]:cursor-pointer [&>button]:cursor-pointer"
          >
            <RadioGroupItem value={id} id={id} />
            <Label htmlFor={id} className="inline-block pb-1">
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
});

export default Body;
