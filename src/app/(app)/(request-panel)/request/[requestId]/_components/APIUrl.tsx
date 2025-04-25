"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";
import { cn } from "@/lib/utils";

const methodList = [
  {
    id: "get",
    label: "GET",
  },
  {
    id: "post",
    label: "POST",
  },
  {
    id: "put",
    label: "PUT",
  },
  {
    id: "patch",
    label: "PATCH",
  },
  {
    id: "delete",
    label: "DELETE",
  },
];

const APIUrl = memo(() => {
  const { selectedMethod, handleChangeSelectedMethod } = useRequest();
  return (
    <div className="w-full flex items-center">
      <Select
        defaultValue={selectedMethod ?? methodList[0].id}
        onValueChange={handleChangeSelectedMethod}
      >
        <SelectTrigger
          className={cn("w-[150px] rounded-r-none font-semibold", {
            "text-green-500": selectedMethod === "get",
            "text-yellow-500": selectedMethod === "post",
            "text-blue-500": selectedMethod === "put",
            "text-pink-500": selectedMethod === "patch",
            "text-red-500": selectedMethod === "delete",
          })}
        >
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent>
          {methodList.map(({ id, label }) => (
            <SelectItem
              key={id}
              value={id}
              className={cn("font-semibold", {
                "text-green-500": id === "get",
                "text-yellow-500": id === "post",
                "text-blue-500": id === "put",
                "text-pink-500": id === "patch",
                "text-red-500": id === "delete",
              })}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Enter URL or paste text" className="rounded-none" />
      <Button className="rounded-l-none">Send</Button>
    </div>
  );
});

export default APIUrl;
