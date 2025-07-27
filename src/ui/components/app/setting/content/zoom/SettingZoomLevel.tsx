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
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";
import { calculateIntoFixedPoint } from "@/utils";

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

  const zoomLevel = calculateIntoFixedPoint(
    (activeTab === "global"
      ? zoomLevelGlobal
      : (zoomLevelLocal ?? zoomLevelGlobal)) * 100
  );

  const handleZoomLevelChange = (value: string) => {
    dispatch(
      updateSettings({
        zoomLevel: calculateIntoFixedPoint(Number(value) / 100, 1),
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  return (
    <SettingItemHorizontalLayout className="items-center">
      <p>Adjust the interface scale to your preference</p>
      <Select value={String(zoomLevel)} onValueChange={handleZoomLevelChange}>
        <SelectTrigger className="w-full max-w-40" size="sm">
          <SelectValue placeholder="Zoom level" />
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
