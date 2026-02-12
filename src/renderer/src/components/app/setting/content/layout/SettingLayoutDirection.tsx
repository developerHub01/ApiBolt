import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import { senitizeValue } from "@/utils/settings.utils";
import {
  selectLayoutTypeGlobal,
  selectLayoutTypeLocal,
} from "@/context/redux/setting/selectors/setting";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";
import {
  PanelTopDashed as LTRIcon,
  PanelRightOpen as RTLIcon,
  type LucideIcon,
} from "lucide-react";
import type { TLayoutSetting } from "@shared/types/setting.types";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import SettingTypeSelector from "@/components/app/setting/content/layout/SettingTypeSelector";

const layoutList: Array<{
  id: TLayoutSetting;
  label: string;
  subLabel?: string;
  Icon: LucideIcon;
}> = [
  {
    id: "ltr",
    label: "Left To Right",
    subLabel: "Default layout",
    Icon: LTRIcon,
  },
  {
    id: "rtl",
    label: "Right To Left",
    Icon: RTLIcon,
  },
];

const SettingLayoutDirection = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const layoutTypeGlobal = useAppSelector(selectLayoutTypeGlobal);
  const layoutTypeLocal = useAppSelector(selectLayoutTypeLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: layoutTypeGlobal,
      localSetting: layoutTypeLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.layoutType,
      activeTab,
      activeProjectId,
      key: "layoutType",
    });

  const senitizedValue = senitizeValue(value, DEFAULT_SETTINGS.layoutType);

  return (
    <SettingItemContentWrapper className="flex-col gap-4">
      <SettingItemHorizontalLayout className="items-center gap-2">
        <p className="flex-1">Change Layout</p>
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {settingType === "custom" && (
        <SettingTypeSelector
          list={layoutList}
          value={String(senitizedValue)}
          onChange={handleChange}
        />
      )}
    </SettingItemContentWrapper>
  );
};

export default SettingLayoutDirection;
