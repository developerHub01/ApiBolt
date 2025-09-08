import { defaultSettings } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectIsZoomableGlobal,
  selectIsZoomableLocal,
} from "@/context/redux/setting/setting-selector";
import { checkApplyingZoomable } from "@/utils/settings.utils";

const useCheckApplyingZoomable = (): boolean => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const isZoomableGlobal = useAppSelector(selectIsZoomableGlobal);
  const isZoomableLocal = useAppSelector(selectIsZoomableLocal);

  const defaultZoomable = defaultSettings.isZoomable;

  return checkApplyingZoomable({
    activeProjectId,
    isZoomableLocal,
    isZoomableGlobal,
    defaultZoomable,
  });
};

export default useCheckApplyingZoomable;
