import { useCallback, useMemo } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/thunks/setting";
import { useSetting } from "@/context/setting/SettingProvider";
import {
  selectIsZoomableGlobal,
  selectIsZoomableLocal,
} from "@/context/redux/setting/selectors/setting";
import SettingOptionSelector from "@/components/app/setting/content/SettingOptionSelector";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

const zoomableLocalOptions = ["default", "global", "enable", "disable"];
const zoomableGlobalOptions = ["default", "enable", "disable"];

const SettingIsZoomable = () => {
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const isZoomableGlobal = useAppSelector(selectIsZoomableGlobal);
  const isZoomableLocal = useAppSelector(selectIsZoomableLocal);

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

  const handleIsZoomableChange = useCallback(
    (value?: string | undefined) => {
      let updatedValue: number | null = -1;
      if (value === "default") updatedValue = -1;
      else if (value === "global") updatedValue = null;
      else if (value === "disable") updatedValue = 0;
      else if (value === "enable") updatedValue = 1;

      dispatch(
        updateSettings({
          isZoomable: updatedValue,
          projectId: activeTab === "global" ? null : activeProjectId,
        }),
      );
    },
    [activeProjectId, activeTab, dispatch],
  );

  return (
    <SettingItemHorizontalLayout className="items-center">
      <p className="flex-1">Enable keyboard shortcuts for zoom in/out</p>
      {
        <SettingOptionSelector
          list={
            activeTab === "project"
              ? zoomableLocalOptions
              : zoomableGlobalOptions
          }
          value={activeZoomOption}
          onChange={handleIsZoomableChange}
          placeholder="Select zoom setting"
          label="Zoom"
        />
      }
    </SettingItemHorizontalLayout>
  );
};

export default SettingIsZoomable;
