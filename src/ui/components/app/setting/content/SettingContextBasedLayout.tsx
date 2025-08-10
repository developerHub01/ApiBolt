import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingTypeSelector from "@/components/app/setting/SettingTypeSelector";
import SettingSlider from "@/components/app/setting/content/SettingSlider";
import type { SettingType } from "@/types/setting.types";
import { cn } from "@/lib/utils";

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
  isLast?: boolean;
}

const SettingContextBasedLayout = ({
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
  isLast = false,
}: Props) => {
  return (
    <SettingItemHorizontalLayout
      className={cn("flex-col items-center gap-4 py-2.5", {
        "border-b": !isLast,
      })}
    >
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
};

export default SettingContextBasedLayout;
