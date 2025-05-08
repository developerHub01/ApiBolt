import React from "react";
import { cn } from "@/lib/utils";

interface EmptyProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
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
      {!label && !children && <p>Empty</p>}
    </div>
  );
};

export default Empty;
