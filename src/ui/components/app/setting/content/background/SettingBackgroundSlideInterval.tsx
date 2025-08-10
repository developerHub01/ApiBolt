import { useEffect, useState } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import {
  defaultSettings,
  maxBackgroundslideInterval,
  minBackgroundslideInterval,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { senitizeValue } from "@/utils/settings.utils";

const SettingBackgroundSlideInterval = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const slideIntervalGlobal = useAppSelector(
    (state) => state.setting.globalSetting.slideInterval
  );
  const slideIntervalLocal = useAppSelector(
    (state) => state.setting.settings?.slideInterval
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: slideIntervalGlobal,
      localSetting: slideIntervalLocal,
      defaultSettings: defaultSettings.slideInterval,
      activeTab,
      activeProjectId,
      key: "slideInterval",
    });

  const senitizedValue = Number(
    senitizeValue(value, defaultSettings.slideInterval)
  );

  return (
    <SettingItemHorizontalLayout className="flex-col items-center gap-4">
      <SettingItemHorizontalLayout className="w-full items-center gap-2">
        <p className="flex-1">Adjust slide interval</p>
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {settingType === "custom" && (
        <SlideIntervalSlider
          defaultValue={defaultSettings.slideInterval!}
          value={senitizedValue}
          onChange={handleChange}
        />
      )}
    </SettingItemHorizontalLayout>
  );
};

interface SlideIntervalSliderProps {
  value: number;
  defaultValue: number;
  onChange: (value?: number) => void;
}

const SlideIntervalSlider = ({
  value,
  defaultValue,
  onChange,
}: SlideIntervalSliderProps) => {
  const [slideIntervalValue, setSlideIntervalValue] =
    useState<number>(defaultValue);

  const handleOnChange = (value: Array<number>) =>
    setSlideIntervalValue(value[0]);

  useEffect(() => setSlideIntervalValue(value), [value]);

  return (
    <div className="w-full max-w-2xs flex flex-col justify-center items-center p-4 gap-3">
      <p className="text-center">{slideIntervalValue} seconds</p>
      <div className="w-full flex justify-center items-center gap-3">
        <p>{minBackgroundslideInterval}s</p>
        <Slider
          defaultValue={[defaultValue]}
          value={[slideIntervalValue]}
          min={minBackgroundslideInterval}
          max={maxBackgroundslideInterval}
          step={1}
          className={cn("w-full")}
          onValueChange={handleOnChange}
          onValueCommit={(value) => onChange(value[0])}
        />
        <p>{maxBackgroundslideInterval}s</p>
      </div>
    </div>
  );
};

export default SettingBackgroundSlideInterval;
