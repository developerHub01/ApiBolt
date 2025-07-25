import SettingItemHorizontalLayout from "@/components/app/setting/content/zoom/SettingItemHorizontalLayout";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";
import { useSetting } from "@/context/setting/SettingProvider";

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

  const isZoomable =
    activeTab === "global"
      ? isZoomableGlobal
      : (isZoomableLocal ?? isZoomableGlobal);

  const handleIsZoomableChange = (checked: boolean) => {
    dispatch(
      updateSettings({
        isZoomable: checked,
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  return (
    <SettingItemHorizontalLayout>
      <p>Allow keyboard shortcuts to zoom in/out</p>
      <Switch
        id="shortcuts-enable"
        checked={isZoomable}
        onCheckedChange={handleIsZoomableChange}
      />
    </SettingItemHorizontalLayout>
  );
};

export default SettingIsZoomable;
