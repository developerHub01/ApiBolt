import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingThemeList from "@/components/app/setting/content/theme/SettingThemeList";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";

const SettingTheme = () => {
  return (
    <SettingItem id="theme" title="Theme Settings">
      <SettingItemHorizontalLayout className="flex-col items-center gap-4 py-2.5">
        <SettingThemeList />
      </SettingItemHorizontalLayout>
    </SettingItem>
  );
};

export default SettingTheme;
