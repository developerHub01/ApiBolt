import { useAppSelector } from "@/context/redux/hooks";
import type { TLayoutSetting } from "@/types/setting.types";

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

  const layoutTypes: TLayoutSetting =
    (!activeProjectId
      ? layoutTypeGlobal
      : (layoutTypeLocal ?? layoutTypeGlobal)) ?? "ltr";

  return layoutTypes;
};

export default useCheckApplyingLayout;
