import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MetaDataWrapperProps {
  label?: string;
  labelPrefix?: React.ReactNode;
  children: React.ReactNode;
}

const MetaDataWrapper = ({
  label,
  labelPrefix = "",
  children,
}: MetaDataWrapperProps) => {
  return (
    <ScrollArea className="min-h-0 h-full">
      <div className="h-full flex flex-col gap-3 pb-5">
        <div className="flex items-center gap-3">
          {label && (
            <p className="text-foreground text-sm select-none">{label}</p>
          )}
          {labelPrefix}
        </div>
        {children}
      </div>
    </ScrollArea>
  );
};

export default MetaDataWrapper;
