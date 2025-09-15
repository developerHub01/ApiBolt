import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/request-response/selectors/project";
import {
  selectLayoutTypeGlobal,
  selectLayoutTypeLocal,
} from "@/context/redux/setting/setting-selector";
import type {
  TLayoutSetting,
  TLayoutSettingNoSenitize,
} from "@/types/setting.types";

const useCheckApplyingLayout = (): TLayoutSetting => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const layoutTypeGlobal = useAppSelector(selectLayoutTypeGlobal);
  const layoutTypeLocal = useAppSelector(selectLayoutTypeLocal);

  let layoutTypes = ((!activeProjectId
    ? layoutTypeGlobal
    : (layoutTypeLocal ?? layoutTypeGlobal)) ??
    "ltr") as TLayoutSettingNoSenitize;

  if (layoutTypes === "default") layoutTypes = "ltr";

  return layoutTypes as TLayoutSetting;
};

export default useCheckApplyingLayout;
