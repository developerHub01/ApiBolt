import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectLayoutTypeGlobal,
  selectLayoutTypeLocal,
} from "@/context/redux/setting/selectors/setting";
import type {
  TLayoutSetting,
  TLayoutSettingNoSenitize,
} from "@shared/types/setting.types";

const useCheckApplyingLayoutDirection = (): TLayoutSetting => {
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

export default useCheckApplyingLayoutDirection;
