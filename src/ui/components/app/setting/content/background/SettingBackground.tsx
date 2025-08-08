import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingBackgroundImages from "@/components/app/setting/content/background/images/SettingBackgroundImages";
import SettingBackgroundBlur from "@/components/app/setting/content/background/SettingBackgroundBlur";
import SettingBackgroundOpacity from "@/components/app/setting/content/background/SettingBackgroundOpacity";

const SettingBackground = () => {
  return (
    <SettingItem id="background" title="Background Images">
      <div className="w-full flex flex-col gap-4">
        <SettingBackgroundImages />
        <SettingBackgroundOpacity />
        <SettingBackgroundBlur />
      </div>
    </SettingItem>
  );
};

export default SettingBackground;
