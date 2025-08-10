import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface SettingItemHorizontalLayoutProps {
  children: React.ReactNode;
  className?: string;
}
const SettingItemHorizontalLayout = ({
  children,
  className = "",
}: SettingItemHorizontalLayoutProps & ComponentProps<"section">) => {
  return (
    <div className={cn("flex justify-between gap-3", className)}>
      {children}
    </div>
  );
};

export default SettingItemHorizontalLayout;
