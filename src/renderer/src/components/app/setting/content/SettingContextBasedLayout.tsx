import { memo } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingTypeSelector from "@/components/app/setting/SettingTypeSelector";
import SettingSlider from "@/components/app/setting/content/SettingSlider";
import type { SettingType } from "@shared/types/setting.types";

interface Props {
  settingType: SettingType;
  label: string;
  value: number;
  defaultValue: number;
  min: number;
  max: number;
  onChange: (value?: number) => void;
  suffixLable?: string;
  longSuffixLable?: string;
  step?: number;
  handleChangeSettingType: (value: SettingType) => void;
}

const SettingContextBasedLayout = memo(
  ({
    settingType,
    label,
    value,
    defaultValue,
    min,
    max,
    onChange,
    suffixLable,
    longSuffixLable,
    step,
    handleChangeSettingType,
  }: Props) => {
    return (
      <SettingItemHorizontalLayout className="flex-col items-center gap-4">
        <SettingItemHorizontalLayout className="w-full items-center gap-2">
          <p className="flex-1">{label}</p>
          <SettingTypeSelector
            value={settingType}
            onChange={handleChangeSettingType}
          />
        </SettingItemHorizontalLayout>
        {settingType === "custom" && (
          <SettingSlider
            value={value}
            defaultValue={defaultValue}
            min={min}
            max={max}
            onChange={onChange}
            suffixLable={suffixLable}
            longSuffixLable={longSuffixLable}
            step={step}
          />
        )}
      </SettingItemHorizontalLayout>
    );
  },
);

export default SettingContextBasedLayout;
