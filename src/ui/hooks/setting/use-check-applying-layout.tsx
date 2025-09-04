import { useAppSelector } from "@/context/redux/hooks";
import type {
  TLayoutSetting,
  TLayoutSettingNoSenitize,
} from "@/types/setting.types";

const useCheckApplyingLayout = (): TLayoutSetting => {
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );
  const layoutTypeGlobal = useAppSelector(
    (state) => state.setting.globalSetting.layoutType
  );
  const layoutTypeLocal = useAppSelector(
    (state) => state.setting.settings?.layoutType
  );

  let layoutTypes = ((!activeProjectId
    ? layoutTypeGlobal
    : (layoutTypeLocal ?? layoutTypeGlobal)) ??
    "ltr") as TLayoutSettingNoSenitize;

  if (layoutTypes === "default") layoutTypes = "ltr";

  return layoutTypes as TLayoutSetting;
};

export default useCheckApplyingLayout;
