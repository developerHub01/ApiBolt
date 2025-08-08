import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingBackgroundImages from "@/components/app/setting/content/background/images/SettingBackgroundImages";
import SettingBackgroundBlur from "@/components/app/setting/content/background/SettingBackgroundBlur";
import SettingBackgroundOpacity from "@/components/app/setting/content/background/SettingBackgroundOpacity";
import SettingBackgroundOptionWrapper from "@/components/app/setting/content/background/SettingBackgroundOptionWrapper";

const SettingBackground = () => {
  return (
    <SettingItem id="background" title="Background Images">
      <div className="w-full flex flex-col gap-4">
        <SettingBackgroundImages />
        <SettingBackgroundOptionWrapper>
          <SettingBackgroundOpacity />
          <SettingBackgroundBlur />
        </SettingBackgroundOptionWrapper>
      </div>
    </SettingItem>
  );
};

export default SettingBackground;
