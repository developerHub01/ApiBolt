import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import useGlobalLocalBgImages, {
  type SettingBackgroundImagesValueType,
} from "@/hooks/setting/use-global-local-bg-images";
import { defaultSettings } from "@/constant/settings.constant";
import { senitizeValue } from "@/utils/settings.utils";
import SettingBackgroundImage from "./SettingBackgroundImage";
import { Button } from "@/components/ui/button";

const SettingBackgroundImages = () => {
  const { activeTab } = useSetting();
  const backgroundImagesGlobal = useAppSelector(
    (state) => state.setting.globalSetting.backgroundImages
  );
  const backgroundImagesLocal = useAppSelector(
    (state) => state.setting.settings?.backgroundImages
  );

  const { value, settingType, handleChange, handleChangeSettingType } =
    useGlobalLocalBgImages({
      globalSetting: backgroundImagesGlobal,
      localSetting: backgroundImagesLocal,
      activeTab,
    });

  const senitizedValue = senitizeValue(
    value,
    defaultSettings.backgroundImages
  ) as SettingBackgroundImagesValueType;

  return (
    <SettingItemHorizontalLayout className="flex-col gap-4 justify-center border-b py-2.5">
      <SettingItemHorizontalLayout className="items-center gap-2">
        <p className="flex-1">Choose Background images</p>
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {settingType === "custom" && (
        <SettingItemHorizontalLayout className="flex-col justify-center items-center gap-4">
          {/* bg list */}
          {Array.isArray(senitizedValue) && (
            <div className="w-full max-w-64 grid grid-cols-3 gap-2 justify-center items-center">
              {senitizedValue.map((img) => (
                <SettingBackgroundImage src={img} key={img} />
              ))}
            </div>
          )}
          <Button onClick={() => handleChange("upload")} variant={"secondary"}>
            Choose background folder
          </Button>
        </SettingItemHorizontalLayout>
      )}
    </SettingItemHorizontalLayout>
  );
};

export default SettingBackgroundImages;
