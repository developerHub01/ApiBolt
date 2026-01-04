import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectTabListLayoutTypeGlobal,
  selectTabListLayoutTypeLocal,
} from "@/context/redux/setting/selectors/setting";
import type {
  TTabsLayoutSetting,
  TTabsLayoutSettingNoSenitize,
} from "@shared/types/setting.types";

const useCheckApplyingTabListLayoutDirection = (): TTabsLayoutSetting => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const layoutTypeGlobal = useAppSelector(selectTabListLayoutTypeGlobal);
  const layoutTypeLocal = useAppSelector(selectTabListLayoutTypeLocal);

  let layoutTypes = ((!activeProjectId
    ? layoutTypeGlobal
    : (layoutTypeLocal ?? layoutTypeGlobal)) ??
    "ltr") as TTabsLayoutSettingNoSenitize;

  if (layoutTypes === "default") layoutTypes = "right";

  return layoutTypes as TTabsLayoutSetting;
};

export default useCheckApplyingTabListLayoutDirection;
