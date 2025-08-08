import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingBackgroundImages from "@/components/app/setting/content/background/images/SettingBackgroundImages";

const SettingBackground = () => {
  return (
    <SettingItem id="background" title="Background Images">
      <div className="w-full flex flex-col gap-4">
        <SettingBackgroundImages />
      </div>
    </SettingItem>
  );
};

export default SettingBackground;
