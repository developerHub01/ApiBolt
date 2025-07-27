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

const fontList = Array.from({ length: 14 })
  .map((_, index) => index + 12)
  .map(String);

const SettingCodeFontSize = () => {
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
      : (codeFontSizeLocal ?? codeFontSizeGlobal);

  const handleCodeFontSizeChange = (value: string) => {
    dispatch(
      updateSettings({
        codeFontSize: value === "Global Setting" ? undefined : Number(value),
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  return (
    <SettingItemHorizontalLayout>
      <p>Adjust code font size</p>
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
            {(activeTab === "global"
              ? fontList
              : ["Global Setting", ...fontList]
            ).map((size: string) => (
              <SelectItem key={size} value={size}>
                {size}
                {size === "Global Setting" ? null : "px"}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SettingItemHorizontalLayout>
  );
};

export default SettingCodeFontSize;
