import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingLayoutDirection from "@/components/app/setting/content/layout/SettingLayoutDirection";
import SettingLayoutActivityBar from "@/components/app/setting/content/layout/SettingLayoutActivityBar";

const SettingLayout = () => {
  return (
    <SettingItem id="layout" title="Layout Settings">
      <SettingLayoutDirection />
      <SettingLayoutActivityBar />
    </SettingItem>
  );
};

export default SettingLayout;
