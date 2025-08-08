import type React from "react";
import useCheckApplyingBackgroundImages from "@/hooks/setting/use-check-applying-setting-scope-background-images";

interface SettingBackgroundOptionWrapperProps {
  children?: React.ReactNode;
}

const SettingBackgroundOptionWrapper = ({
  children,
}: SettingBackgroundOptionWrapperProps) => {
  const backgroundImages = useCheckApplyingBackgroundImages();

  if (!Array.isArray(backgroundImages) || !backgroundImages.length) return null;

  return <>{children}</>;
};

export default SettingBackgroundOptionWrapper;
