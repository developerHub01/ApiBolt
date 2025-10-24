import { useCallback, useMemo } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/thunk/setting-thunk";
import { useSetting } from "@/context/setting/SettingProvider";
import {
  selectActivityBarVisibleGlobal,
  selectActivityBarVisibleLocal,
} from "@/context/redux/setting/selectors/setting-selector";
import { selectActiveProjectId } from "@/context/redux/request-response/selectors/project";
import SettingOptionSelector from "@/components/app/setting/content/SettingOptionSelector";

const activityBarVisibleLocalOptions = ["default", "global", "show", "hide"];
const activityBarVisibleGlobalOptions = ["default", "show", "hide"];

const SettingLayoutActivityBar = () => {
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const activityBarVisibleGlobal = useAppSelector(
    selectActivityBarVisibleGlobal
  );
  const activityBarVisibleLocal = useAppSelector(selectActivityBarVisibleLocal);

  const activeActivityBarVisibleOption = useMemo(() => {
    let value = "default";
    if (activeTab === "project") {
      if (activityBarVisibleLocal === -1) value = "default";
      else if (activityBarVisibleLocal === null) value = "global";
      else if (activityBarVisibleLocal === 0) value = "hide";
      else value = "show";
    } else {
      if (activityBarVisibleGlobal === -1 || activityBarVisibleGlobal === null)
        value = "default";
      else if (activityBarVisibleGlobal === 0) value = "hide";
      else value = "show";
    }
    return value;
  }, [activeTab, activityBarVisibleGlobal, activityBarVisibleLocal]);

  const handleActivityBarVisible = useCallback(
    (value?: string | undefined) => {
      let updatedValue: number | null = -1;
      if (value === "default") updatedValue = -1;
      else if (value === "global") updatedValue = null;
      else if (value === "hide") updatedValue = 0;
      else if (value === "show") updatedValue = 1;

      dispatch(
        updateSettings({
          activityBarVisible: updatedValue,
          projectId: activeTab === "global" ? null : activeProjectId,
        })
      );
    },
    [activeProjectId, activeTab, dispatch]
  );

  return (
    <SettingItemHorizontalLayout className="py-2.5 items-center">
      <p className="flex-1">Activity bar visibility</p>
      {
        <SettingOptionSelector
          list={
            activeTab === "project"
              ? activityBarVisibleLocalOptions
              : activityBarVisibleGlobalOptions
          }
          value={activeActivityBarVisibleOption}
          onChange={handleActivityBarVisible}
          placeholder="Activity bar visibility"
        />
      }
    </SettingItemHorizontalLayout>
  );
};

export default SettingLayoutActivityBar;
