import React, { memo } from "react";
import AuthTypeTab from "@/components/app/authorization/AuthTypeTab";
import AuthDetails from "@/components/app/authorization/AuthDetails";
import { cn } from "@/lib/utils";

const AuthTop = memo(({ className }: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-4">
        <p className="text-base shrink-0">Auth Type:</p>
        <AuthTypeTab className="w-full max-w-52" />
      </div>
      <AuthDetails />
    </div>
  );
});

export default AuthTop;
