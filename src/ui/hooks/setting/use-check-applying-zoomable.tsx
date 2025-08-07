import { defaultSettings } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { checkApplyingZoomable } from "@/utils/settings.utils";

const useCheckApplyingZoomable = (): boolean => {
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const isZoomableGlobal = useAppSelector(
    (state) => state.setting.globalSetting.isZoomable
  );
  const isZoomableLocal = useAppSelector(
    (state) => state.setting.settings?.isZoomable
  );

  const defaultZoomable = defaultSettings.isZoomable;

  return checkApplyingZoomable({
    activeProjectId,
    isZoomableLocal,
    isZoomableGlobal,
    defaultZoomable,
  });
};

export default useCheckApplyingZoomable;
