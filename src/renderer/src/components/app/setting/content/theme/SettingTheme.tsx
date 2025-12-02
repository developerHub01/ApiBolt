import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";
import SettingThemeList from "@/components/app/setting/content/theme/SettingThemeList";

const SettingTheme = () => {
  return (
    <SettingItem id="theme" title="Theme Settings">
      <SettingItemContentWrapper>
        <SettingThemeList />
      </SettingItemContentWrapper>
    </SettingItem>
  );
};

export default SettingTheme;
