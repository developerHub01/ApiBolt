import { useEffect, useState } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import {
  defaultSettings,
  maxBackgroundMaxNumberOfImages,
  minBackgroundMaxNumberOfImages,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { senitizeValue } from "@/utils/settings.utils";

const SettingBackgroundMaxNumberOfImages = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const maxImagesGlobal = useAppSelector(
    (state) => state.setting.globalSetting.maxNumberOfImages
  );
  const maxImagesLocal = useAppSelector(
    (state) => state.setting.settings?.maxNumberOfImages
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: maxImagesGlobal,
      localSetting: maxImagesLocal,
      defaultSettings: defaultSettings.maxNumberOfImages,
      activeTab,
      activeProjectId,
      key: "maxNumberOfImages",
    });

  const senitizedValue = Number(
    senitizeValue(value, defaultSettings.maxNumberOfImages)
  );

  return (
    <SettingItemHorizontalLayout className="flex-col items-center gap-4">
      <SettingItemHorizontalLayout className="w-full items-center gap-2">
        <p className="flex-1">Allow max number of images</p>
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {settingType === "custom" && (
        <MaxNumberOfImagesSlider
          defaultValue={defaultSettings.maxNumberOfImages!}
          value={senitizedValue}
          onChange={handleChange}
        />
      )}
    </SettingItemHorizontalLayout>
  );
};

interface MaxNumberOfImagesSliderProps {
  value: number;
  defaultValue: number;
  onChange: (value?: number) => void;
}

const MaxNumberOfImagesSlider = ({
  value,
  defaultValue,
  onChange,
}: MaxNumberOfImagesSliderProps) => {
  const [maxImagesValue, setMaxImagesValue] = useState<number>(defaultValue);

  const handleOnChange = (value: Array<number>) => {
    setMaxImagesValue(value[0]);
  };

  useEffect(() => {
    setMaxImagesValue(value);
  }, [value]);

  return (
    <div className="w-full max-w-2xs flex flex-col justify-center items-center p-4 gap-3">
      <p className="text-center">{maxImagesValue}</p>
      <div className="w-full flex justify-center items-center gap-3">
        <p>{minBackgroundMaxNumberOfImages}</p>
        <Slider
          defaultValue={[defaultValue]}
          value={[maxImagesValue]}
          min={minBackgroundMaxNumberOfImages}
          max={maxBackgroundMaxNumberOfImages}
          step={1}
          className={cn("w-full")}
          onValueChange={handleOnChange}
          onValueCommit={(value) => onChange(value[0])}
        />
        <p>{maxBackgroundMaxNumberOfImages}</p>
      </div>
    </div>
  );
};

export default SettingBackgroundMaxNumberOfImages;
