import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import { useSetting } from "@/context/setting/SettingProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { calculateIntoFixedPoint } from "@/utils";
import SettingType from "@/components/app/setting/SettingType";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { defaultSettings } from "@/constant/settings.constant";
import { senitizeValue } from "@/utils/settings.utils";

const zoomList = Array.from({ length: 11 })
  .map((_, index) => (index + 5) * 10)
  .map(String);

const SettingZoomLevel = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const zoomLevelGlobal = useAppSelector(
    (state) => state.setting.globalSetting.zoomLevel
  );
  const zoomLevelLocal = useAppSelector(
    (state) => state.setting.settings?.zoomLevel
  );

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: zoomLevelGlobal,
      localSetting: zoomLevelLocal,
      defaultSettings: defaultSettings.zoomLevel,
      activeTab,
      activeProjectId,
      key: "zoomLevel",
    });

  const senitizedValue = calculateIntoFixedPoint(
    Number(senitizeValue(value, defaultSettings.zoomLevel)) * 100
  );

  return (
    <SettingItemHorizontalLayout className="items-center">
      <p className="flex-1">Adjust the interface scale to your preference</p>
      <SettingType value={settingType} onChange={handleChangeSettingType} />
      {settingType === "custom" && (
        <ZoomLevelSelector
          value={String(senitizedValue)}
          onChange={(value) =>
            handleChange(calculateIntoFixedPoint(Number(value) / 100, 1))
          }
        />
      )}
    </SettingItemHorizontalLayout>
  );
};

interface ZoomLevelSelectorProps {
  value: string;
  onChange: (value?: string) => void;
}

const ZoomLevelSelector = ({ value, onChange }: ZoomLevelSelectorProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full max-w-32" size="sm">
      <SelectValue placeholder="Zoom level" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Zoom</SelectLabel>
        {zoomList.map((size: string) => (
          <SelectItem key={size} value={size}>
            {size}%
            {size === String(defaultSettings.zoomLevel) ? " (default)" : null}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SettingZoomLevel;
