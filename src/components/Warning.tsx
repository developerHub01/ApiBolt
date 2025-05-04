import React, { memo } from "react";
import { Info as InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WarningProps {
  label?: string;
  className?: string;
}

const Warning = memo(({ label, className }: WarningProps) => {
  return (
    <p
      className={cn(
        "text-[13px] pt-0.5 leading-relaxed select-none",
        className
      )}
    >
      <InfoIcon size={14} className="inline-block mr-1" />
      {label}
    </p>
  );
});
Warning.displayName = "Warning";

export default Warning;
