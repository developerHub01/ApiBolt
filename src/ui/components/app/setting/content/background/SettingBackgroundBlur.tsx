import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import {
  defaultSettings,
  maxBackgroundBlur,
} from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const blurList = Array.from({ length: maxBackgroundBlur + 1 })
  .map((_, index) => index)
  .map(String);

const SettingBackgroundBlur = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const blurGlobal = useAppSelector(
    (state) => state.setting.globalSetting.backgroundBlur
  );
  const blurLocal = useAppSelector(
    (state) => state.setting.settings?.backgroundBlur
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: blurGlobal,
      localSetting: blurLocal,
      defaultSettings: defaultSettings.backgroundBlur,
      activeTab,
      activeProjectId,
      key: "backgroundBlur",
    });

  const senitizedValue = senitizeValue(value, defaultSettings.backgroundBlur);

  return (
    <SettingItemHorizontalLayout className="items-center gap-2">
      <p className="flex-1">Adjust background blur</p>
      <SettingType value={settingType} onChange={handleChangeSettingType} />
      {settingType === "custom" && (
        <OpacitySelector
          defaultValue={String(defaultSettings.backgroundBlur)}
          value={String(senitizedValue)}
          onChange={handleChange}
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
      <SelectValue placeholder="Background Blur" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Background Blur</SelectLabel>
        {blurList.map((size: string) => (
          <SelectItem key={size} value={size}>
            {size === String(defaultValue)
              ? `Default (${size}px)`
              : `${size}px`}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SettingBackgroundBlur;
