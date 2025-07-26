import { cn } from "@/lib/utils";
import type { HTMLProps } from "react";

interface SettingItemHorizontalLayoutProps {
  children: React.ReactNode;
  className?: string;
}
const SettingItemHorizontalLayout = ({
  children,
  className = "",
}: SettingItemHorizontalLayoutProps & HTMLProps<"section">) => {
  return (
    <div className={cn("flex justify-between gap-3", className)}>
      {children}
    </div>
  );
};

export default SettingItemHorizontalLayout;
