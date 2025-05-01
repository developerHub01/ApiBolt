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
import {
  TRequestBodyType,
  useRequestBody,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import BeautifyCode from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/raw/BeautifyCode";
import BodyDetails from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/body/BodyDetails";

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

const Body = memo(() => {
  const {
    requestBodyType,
    handleChangeRequestBodyType,
    rawRequestBodyType,
    handleChangeRawRequestBodyType,
  } = useRequestBody();

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-3 items-center flex-wrap">
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
            <div
              key={id}
              className="flex items-center justify-center gap-2 [&>label]:cursor-pointer [&>button]:cursor-pointer"
            >
              <RadioGroupItem value={id} id={id} />
              <Label
                htmlFor={id}
                className="inline-block pb-1 whitespace-nowrap"
              >
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {requestBodyType === "raw" && (
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
        )}

        {/* format code block */}
        {requestBodyType === "raw" && rawRequestBodyType !== "text" && (
          <BeautifyCode />
        )}
      </div>

      <BodyDetails bodyType={requestBodyType} />
    </div>
  );
});

export default Body;
