"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const methodList = ["get", "post", "patch", "put", "delete"];

const APIUrl = () => {
  return (
    <div className="w-full flex items-center">
      <Select>
        <SelectTrigger className="w-[180px] rounded-r-none">
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent>
          {methodList.map((method) => (
            <SelectItem key={method} value={method}>
              {method.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Enter URL or paste text" className="rounded-none" />
      <Button className="rounded-l-none">Send</Button>
    </div>
  );
};

export default APIUrl;
