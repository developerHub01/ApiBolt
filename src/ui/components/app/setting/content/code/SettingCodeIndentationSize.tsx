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
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import { defaultSettings } from "@/constant/settings.constant";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { senitizeValue } from "@/utils/settings.utils";

const indentationList = Array.from({ length: 7 })
  .map((_, index) => index + 2)
  .map(String);

const SettingCodeIndentationSize = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const indentationSizeGlobal = useAppSelector(
    (state) => state.setting.globalSetting.indentationSize
  );
  const indentationSizeLocal = useAppSelector(
    (state) => state.setting.settings?.indentationSize
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: indentationSizeGlobal,
      localSetting: indentationSizeLocal,
      defaultSettings: defaultSettings.indentationSize,
      activeTab,
      activeProjectId,
      key: "indentationSize",
    });

  const senitizedValue = senitizeValue(value, defaultSettings.codeFontSize);

  return (
    <SettingItemHorizontalLayout className="items-center gap-2">
      <p className="flex-1">Adjust code indentation size</p>
      <SettingType value={settingType} onChange={handleChangeSettingType} />
      {settingType === "custom" && (
        <IndentationSizeSelector
          value={String(senitizedValue)}
          onChange={handleChange}
        />
      )}
    </SettingItemHorizontalLayout>
  );
};

interface IndentationSizeSelectorProps {
  value: string;
  onChange: (value?: string) => void;
}

const IndentationSizeSelector = ({
  value,
  onChange,
}: IndentationSizeSelectorProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full max-w-32" size="sm">
      <SelectValue placeholder="Code Indentation Size" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Indentation size</SelectLabel>
        {indentationList.map((size: string) => (
          <SelectItem key={size} value={size}>
            {size}
            {size === String(defaultSettings.indentationSize)
              ? " (default)"
              : null}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SettingCodeIndentationSize;
