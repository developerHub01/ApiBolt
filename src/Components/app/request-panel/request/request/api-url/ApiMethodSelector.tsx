"use client";

import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

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

const ApiMethodSelector = memo(() => {
  const { selectedMethod, handleChangeSelectedMethod } = useRequestResponse();
  return (
    <div className="w-[150px] select-none">
      <Select
        defaultValue={selectedMethod ?? methodList[0].id}
        onValueChange={handleChangeSelectedMethod}
      >
        <SelectTrigger
          className={cn("w-full rounded-r-none font-semibold", {
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
    </div>
  );
});

ApiMethodSelector.displayName = "API method selector";

export default ApiMethodSelector;
