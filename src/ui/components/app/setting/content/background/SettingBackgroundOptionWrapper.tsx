import type React from "react";
import useCheckApplyingSettingScopeBackgroundImages from "@/hooks/setting/use-check-applying-setting-scope-background-images";

interface SettingBackgroundOptionWrapperProps {
  children?: React.ReactNode;
}

const SettingBackgroundOptionWrapper = ({
  children,
}: SettingBackgroundOptionWrapperProps) => {
  const backgroundImages = useCheckApplyingSettingScopeBackgroundImages();

  if (!Array.isArray(backgroundImages) || !backgroundImages.length) return null;

  return <>{children}</>;
};

export default SettingBackgroundOptionWrapper;
