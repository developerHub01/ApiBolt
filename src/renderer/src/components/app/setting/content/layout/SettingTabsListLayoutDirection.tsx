import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import { senitizeValue } from "@/utils/settings.utils";
import {
  selectTabListLayoutTypeGlobal,
  selectTabListLayoutTypeLocal,
} from "@/context/redux/setting/selectors/setting";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";
import {
  PanelTopDashed as TopLayoutIcon,
  PanelRightDashed as RightLayoutIcon,
  type LucideIcon,
} from "lucide-react";
import type { TTabsLayoutSetting } from "@shared/types/setting.types";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import SettingTypeSelector from "@/components/app/setting/content/layout/SettingTypeSelector";

const layoutList: Array<{
  id: TTabsLayoutSetting;
  label: string;
  subLabel?: string;
  Icon: LucideIcon;
}> = [
  {
    id: "top",
    label: "Top Align",
    subLabel: "Default layout",
    Icon: TopLayoutIcon,
  },
  {
    id: "right",
    label: "Right Align",
    Icon: RightLayoutIcon,
  },
];

const SettingTabsListLayoutDirection = () => {
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const layoutTypeGlobal = useAppSelector(selectTabListLayoutTypeGlobal);
  const layoutTypeLocal = useAppSelector(selectTabListLayoutTypeLocal);

  const { value, handleChange, handleChangeSettingType, settingType } =
    useGlobalLocalSettingv1({
      globalSetting: layoutTypeGlobal,
      localSetting: layoutTypeLocal,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS.tabListLayoutType,
      activeTab,
      activeProjectId,
      key: "tabListLayoutType",
    });

  const senitizedValue = senitizeValue(
    value,
    DEFAULT_SETTINGS.tabListLayoutType,
  );

  return (
    <SettingItemContentWrapper className="flex-col gap-4">
      <SettingItemHorizontalLayout className="items-center gap-2">
        <p className="flex-1">Change Tab List Layout</p>
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

export default SettingTabsListLayoutDirection;
