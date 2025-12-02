import React, { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

const SettingItemContentWrapper = ({
  children,
  className = "",
  ...otherProps
}: Props & ComponentProps<"div">) => {
  return (
    <div className={cn("w-full flex flex-col", className)} {...otherProps}>
      {children}
    </div>
  );
};

export default SettingItemContentWrapper;
