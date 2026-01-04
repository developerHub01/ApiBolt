import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingLayoutDirection from "@/components/app/setting/content/layout/SettingLayoutDirection";
import SettingLayoutActivityBar from "@/components/app/setting/content/layout/SettingLayoutActivityBar";
import SettingTabsListLayoutDirection from "@/components/app/setting/content/layout/SettingTabsListLayoutDirection";

const SettingLayout = () => {
  return (
    <SettingItem id="layout" title="Layout Settings">
      <SettingLayoutActivityBar />
      <SettingLayoutDirection />
      <SettingTabsListLayoutDirection />
    </SettingItem>
  );
};

export default SettingLayout;
