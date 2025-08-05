import { useCallback, useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import type { SettingsType } from "@/types/setting.types";

const fontList = Array.from({ length: 14 })
  .map((_, index) => index + 12)
  .map(String);

const SettingCodeFontSize = () => {
  const [settingType, setSettingType] = useState<SettingsType>("default");
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const codeFontSizeGlobal = useAppSelector(
    (state) => state.setting.globalSetting.codeFontSize
  );
  const codeFontSizeLocal = useAppSelector(
    (state) => state.setting.settings?.codeFontSize
  );

  const codeFontSize =
    activeTab === "global"
      ? codeFontSizeGlobal
      : (codeFontSizeLocal ?? "Global Setting");

  const handleCodeFontSizeChange = useCallback(
    (value?: string) => {
      const codeFontSize =
        settingType === "default"
          ? defaultSettings.codeFontSize
          : settingType === "global"
            ? null
            : Number(value ?? defaultSettings.codeFontSize);

      dispatch(
        updateSettings({
          codeFontSize,
          projectId: activeTab === "global" ? null : activeProjectId,
        })
      );
    },
    [activeProjectId, activeTab, dispatch, settingType]
  );

  useEffect(() => {
    handleCodeFontSizeChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingType]);

  const handleChangeSettingType = useCallback((value: SettingsType) => {
    setSettingType(value);
    if (value === "custom") return;
  }, []);

  return (
    <SettingItemHorizontalLayout className="flex-col">
      <SettingItemHorizontalLayout className="items-center gap-2">
        <p>Adjust code font size</p>
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {settingType === "custom" && (
        <div className="flex items-center justify-center gap-2">
          <Select
            value={String(codeFontSize)}
            onValueChange={handleCodeFontSizeChange}
          >
            <SelectTrigger className="w-full max-w-40" size="sm">
              <SelectValue placeholder="Code Font Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Font size</SelectLabel>
                {fontList.map((size: string) => (
                  <SelectItem key={size} value={size}>
                    {size} px
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </SettingItemHorizontalLayout>
  );
};

export default SettingCodeFontSize;
