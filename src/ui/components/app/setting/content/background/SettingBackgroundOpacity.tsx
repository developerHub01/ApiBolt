import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import {
  defaultSettings,
  maxBackgroundOpacity,
  minBackgroundOpacity,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import { calculateIntoFixedPoint } from "@/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const opacityList = Array.from({
  length: (maxBackgroundOpacity * 100 - minBackgroundOpacity * 100) / 5 + 1,
})
  .map((_, index) => index * 5 + minBackgroundOpacity * 100)
  .map(String);

const SettingBackgroundOpacity = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const opacityGlobal = useAppSelector(
    (state) => state.setting.globalSetting.backgroundOpacity
  );
  const opacityLocal = useAppSelector(
    (state) => state.setting.settings?.backgroundOpacity
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: opacityGlobal,
      localSetting: opacityLocal,
      defaultSettings: defaultSettings.backgroundOpacity,
      activeTab,
      activeProjectId,
      key: "backgroundOpacity",
    });

  const senitizedValue = calculateIntoFixedPoint(
    Number(senitizeValue(value, defaultSettings.backgroundOpacity)) * 100
  );

  return (
    <SettingItemHorizontalLayout className="items-center gap-2">
      <p className="flex-1">Adjust background opacity</p>
      <SettingType value={settingType} onChange={handleChangeSettingType} />
      {settingType === "custom" && (
        <OpacitySelector
          defaultValue={String(
            calculateIntoFixedPoint(defaultSettings.backgroundOpacity * 100)
          )}
          value={String(senitizedValue)}
          onChange={(value) =>
            handleChange(calculateIntoFixedPoint(Number(value) / 100, 1))
          }
        />
      )}
    </SettingItemHorizontalLayout>
  );
};

interface OpacitySelectorProps {
  value: string;
  defaultValue: string;
  onChange: (value?: string) => void;
}

const OpacitySelector = ({
  value,
  defaultValue,
  onChange,
}: OpacitySelectorProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full max-w-36" size="sm">
      <SelectValue placeholder="Background Opacity" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Background Opacity</SelectLabel>
        {opacityList.map((size: string) => (
          <SelectItem key={size} value={size}>
            {size === String(defaultValue) ? `Default (${size}%)` : `${size}%`}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SettingBackgroundOpacity;
