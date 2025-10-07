import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingBackgroundImages from "@/components/app/setting/content/background/images/SettingBackgroundImages";
import SettingBackgroundBlur from "@/components/app/setting/content/background/SettingBackgroundBlur";
import SettingBackgroundOpacity from "@/components/app/setting/content/background/SettingBackgroundOpacity";
import SettingBackgroundOptionWrapper from "@/components/app/setting/content/background/SettingBackgroundOptionWrapper";
import SettingBackgroundMaxNumberOfImages from "@/components/app/setting/content/background/SettingBackgroundMaxNumberOfImages";
import SettingBackgroundSlideInterval from "@/components/app/setting/content/background/SettingBackgroundSlideInterval";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";

const SettingBackground = () => {
  return (
    <SettingItem id="background" title="Background Images">
      <SettingItemContentWrapper>
        <SettingBackgroundImages />
        <SettingBackgroundOptionWrapper>
          <SettingBackgroundOpacity />
          <SettingBackgroundBlur />
          <SettingBackgroundMaxNumberOfImages />
          <SettingBackgroundSlideInterval />
        </SettingBackgroundOptionWrapper>
      </SettingItemContentWrapper>
    </SettingItem>
  );
};

export default SettingBackground;
