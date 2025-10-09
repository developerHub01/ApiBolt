import React, { memo } from "react";
import AuthTypeTab from "@/components/app/authorization/AuthTypeTab";
import AuthDetails from "@/components/app/authorization/AuthDetails";
import { cn } from "@/lib/utils";
import type { TAuthContextType } from "@/types/authorization.types";

interface Props {
  id: string;
  contextType?: TAuthContextType;
}

const AuthTop = memo(
  ({ id, className }: Props & React.ComponentProps<"div">) => {
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <div className="flex justify-between items-center gap-4">
          <p className="text-base shrink-0">Auth Type:</p>
          <AuthTypeTab className="w-full max-w-52" id={id} />
        </div>
        <AuthDetails id={id} />
      </div>
    );
  }
);

export default AuthTop;
