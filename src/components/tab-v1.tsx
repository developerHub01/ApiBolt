"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TabV1Props {
  list: Array<{
    id: string;
    label: string;
  }>;
  activeTab: string;
  handleSelect: (id: string) => void;
  className?: string;
}

const TabV1 = ({ list, activeTab, handleSelect, className }: TabV1Props) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {list.map(({ id, label }) => (
        <Button
          key={id}
          size={"sm"}
          variant={"link"}
          className={cn("px-0 underline-offset-8", {
            "underline text-primary": activeTab === id,
            "no-underline text-foreground/70 hover:text-foreground hover:no-underline":
              activeTab !== id,
          })}
          onClick={() => handleSelect(id)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TabV1;
