import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultSettings } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";

const fontList = Array.from({ length: 14 })
  .map((_, index) => index + 12)
  .map(String);

const SettingCodeFontSize = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const codeFontSizeGlobal = useAppSelector(
    (state) => state.setting.globalSetting.codeFontSize
  );
  const codeFontSizeLocal = useAppSelector(
    (state) => state.setting.settings?.codeFontSize
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: codeFontSizeGlobal,
      localSetting: codeFontSizeLocal,
      defaultSettings: defaultSettings.codeFontSize,
      activeTab,
      activeProjectId,
      key: "codeFontSize",
    });

  const senitizedValue = senitizeValue(value, defaultSettings.codeFontSize);

  return (
    <SettingItemHorizontalLayout className="items-center gap-2">
      <p className="flex-1">Adjust code font size</p>
      <SettingType value={settingType} onChange={handleChangeSettingType} />
      {settingType === "custom" && (
        <FontSizeSelector
          value={String(senitizedValue)}
          onChange={handleChange}
        />
      )}
    </SettingItemHorizontalLayout>
  );
};

interface FontSizeSelectorProps {
  value: string;
  onChange: (value?: string) => void;
}

const FontSizeSelector = ({ value, onChange }: FontSizeSelectorProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full max-w-36" size="sm">
      <SelectValue placeholder="Code Font Size" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Font size</SelectLabel>
        {fontList.map((size: string) => (
          <SelectItem key={size} value={size}>
            {size === String(defaultSettings.codeFontSize)
              ? `Default (${size}px)`
              : `${size}px`}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SettingCodeFontSize;
