import type React from "react";
import { cn } from "@/lib/utils";

interface AuthKeyValueWrapperProps {
  children: React.ReactNode;
}

const AuthKeyValueWrapper = ({
  children,
  className,
  ...props
}: AuthKeyValueWrapperProps & React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default AuthKeyValueWrapper;
