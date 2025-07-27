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

const indentationList = Array.from({ length: 7 })
  .map((_, index) => index + 2)
  .map(String);

const SettingCodeIndentationSize = () => {
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
    activeTab === "global"
      ? indentationSizeGlobal
      : (indentationSizeLocal ?? indentationSizeGlobal);

  const handleIndentationSizeChange = (value: string) => {
    dispatch(
      updateSettings({
        indentationSize: value === "Global Setting" ? undefined : Number(value),
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  return (
    <SettingItemHorizontalLayout>
      <p>Adjust code indentation size</p>
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
            {(activeTab === "global"
              ? indentationList
              : ["Global Setting", ...indentationList]
            ).map((size: string) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SettingItemHorizontalLayout>
  );
};

export default SettingCodeIndentationSize;
