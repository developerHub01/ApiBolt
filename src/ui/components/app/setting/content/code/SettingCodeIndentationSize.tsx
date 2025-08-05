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
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingType from "@/components/app/setting/SettingType";
import type { SettingsType } from "@/types/setting.types";
import { defaultSettings } from "@/constant/settings.constant";

const indentationList = Array.from({ length: 7 })
  .map((_, index) => index + 2)
  .map(String);

const SettingCodeIndentationSize = () => {
  const [settingType, setSettingType] = useState<SettingsType>("default");
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const indentationSizeGlobal = useAppSelector(
    (state) => state.setting.globalSetting.indentationSize
  );
  const indentationSizeLocal = useAppSelector(
    (state) => state.setting.settings?.indentationSize
  );

  const indentationSize =
    (activeTab === "global" ? indentationSizeGlobal : indentationSizeLocal) ??
    defaultSettings.indentationSize;

  const handleIndentationSizeChange = (value?: string) => {
    const indentationSize =
      settingType === "default"
        ? defaultSettings.indentationSize
        : settingType === "global"
          ? null
          : Number(value ?? defaultSettings.indentationSize);

    dispatch(
      updateSettings({
        indentationSize,
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  useEffect(() => {
    handleIndentationSizeChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingType]);

  const handleChangeSettingType = useCallback((value: SettingsType) => {
    setSettingType(value);
    if (value === "custom") return;
  }, []);

  return (
    <SettingItemHorizontalLayout className="flex-col">
      <SettingItemHorizontalLayout className="items-center gap-2">
        <p>Adjust code indentation size</p>
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {settingType === "custom" && (
        <div className="flex items-center justify-center gap-2">
          <Select
            value={String(indentationSize)}
            onValueChange={handleIndentationSizeChange}
          >
            <SelectTrigger className="w-full max-w-40" size="sm">
              <SelectValue placeholder="Code Indentation Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Indentation size</SelectLabel>
                {indentationList.map((size: string) => (
                  <SelectItem key={size} value={size}>
                    {size}
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

export default SettingCodeIndentationSize;
