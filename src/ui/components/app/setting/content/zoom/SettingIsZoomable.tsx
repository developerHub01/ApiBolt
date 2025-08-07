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
import { useMemo } from "react";

const zoomableLocalOptions = ["default", "global", "enable", "disable"];
const zoomableGlobalOptions = ["default", "enable", "disable"];

const SettingIsZoomable = () => {
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const isZoomableGlobal = useAppSelector(
    (state) => state.setting.globalSetting.isZoomable
  );
  const isZoomableLocal = useAppSelector(
    (state) => state.setting.settings?.isZoomable
  );

  const activeZoomOption = useMemo(() => {
    let value = "default";
    if (activeTab === "project") {
      if (isZoomableLocal === -1) value = "default";
      else if (isZoomableLocal === null) value = "global";
      else if (isZoomableLocal === 0) value = "disable";
      else value = "enable";
    } else {
      if (isZoomableGlobal === -1 || isZoomableGlobal === null)
        value = "default";
      else if (isZoomableGlobal === 0) value = "disable";
      else value = "enable";
    }
    return value;
  }, [activeTab, isZoomableGlobal, isZoomableLocal]);

  const handleIsZoomableChange = (value?: string | undefined) => {
    let updatedValue: number | null = -1;
    if (value === "default") updatedValue = -1;
    else if (value === "global") updatedValue = null;
    else if (value === "disable") updatedValue = 0;
    else if (value === "enable") updatedValue = 1;

    dispatch(
      updateSettings({
        isZoomable: updatedValue,
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  return (
    <SettingItemHorizontalLayout>
      <p className="flex-1">Allow keyboard shortcuts to zoom in/out</p>
      {activeTab === "project" ? (
        <ZoomableOptionSelector
          list={zoomableLocalOptions}
          value={activeZoomOption}
          onChange={handleIsZoomableChange}
        />
      ) : (
        <ZoomableOptionSelector
          list={zoomableGlobalOptions}
          value={activeZoomOption}
          onChange={handleIsZoomableChange}
        />
      )}
    </SettingItemHorizontalLayout>
  );
};

interface ZoomableOptionSelectorProps {
  list: Array<string>;
  value: string;
  onChange: (value?: string) => void;
}

const ZoomableOptionSelector = ({
  list,
  value,
  onChange,
}: ZoomableOptionSelectorProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full max-w-32 capitalize" size="sm">
      <SelectValue placeholder="Zoom level" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Zoom</SelectLabel>
        {list.map((size: string) => (
          <SelectItem key={size} value={size} className="capitalize">
            {size}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SettingIsZoomable;
