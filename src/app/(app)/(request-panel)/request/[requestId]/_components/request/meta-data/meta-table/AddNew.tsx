"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddNewProps {
  label?: string;
  onClick: () => void;
  className?: string;
  [key: string]: unknown;
}

const AddNew = memo(
  ({ label = "", onClick, className, ...props }: AddNewProps) => {
    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        className={cn("w-full max-w-60 mx-auto", className)}
        onClick={onClick}
        {...props}
      >
        <AddIcon />
        {label}
      </Button>
    );
  }
);
AddNew.displayName = "Add new";

export default AddNew;
