import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingItemHorizontalLayout from "@/components/app/setting/content/zoom/SettingItemHorizontalLayout";
import { useSetting } from "@/context/setting/SettingProvider";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";

const zoomList = Array.from({ length: 11 }).map((_, index) => (index + 5) * 10);

const SettingZoomLevel = () => {
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const zoomLevelGlobal = useAppSelector(
    (state) => state.setting.globalSetting.zoomLevel
  );
  const zoomLevelLocal = useAppSelector(
    (state) => state.setting.settings?.zoomLevel
  );

  const zoomable =
    activeTab === "global"
      ? zoomLevelGlobal
      : (zoomLevelLocal ?? zoomLevelGlobal);

  const handleZoomLevelChange = (value: string) => {
    dispatch(
      updateSettings({
        zoomLevel: Number(value) / 100,
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  return (
    <SettingItemHorizontalLayout>
      <p>Adjust the interface scale to your preference</p>
      <Select
        value={String(zoomable * 100)}
        onValueChange={handleZoomLevelChange}
      >
        <SelectTrigger className="w-full max-w-40">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Zoom</SelectLabel>
            {zoomList.map((size: number) => (
              <SelectItem key={size} value={String(size)}>
                {size}%
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SettingItemHorizontalLayout>
  );
};

export default SettingZoomLevel;
