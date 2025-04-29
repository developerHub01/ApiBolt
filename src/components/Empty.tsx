import { cn } from "@/lib/utils";
import React from "react";

interface EmptyProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const Empty = ({ label, children, className = "", ...props }: EmptyProps) => {
  return (
    <div
      className={cn(
        "w-full h-full min-h-14 flex justify-center items-center text-center text-muted-foreground select-none border-2 border-dashed rounded-md",
        className
      )}
      {...props}
    >
      {label}
      {children && <>{children}</>}
    </div>
  );
};

export default Empty;
