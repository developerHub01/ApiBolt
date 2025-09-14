import SettingItem from "@/components/app/setting/content/SettingItem";
import { DEFAULT_SETTINGS } from "@/constant/settings.constant";
import { useAppSelector } from "@/context/redux/hooks";
import { useSetting } from "@/context/setting/SettingProvider";
import useGlobalLocalSettingv1 from "@/hooks/setting/use-global-local-settingv1";
import { cn } from "@/lib/utils";
import type { TLayoutSetting } from "@/types/setting.types";
import {
  PanelLeftClose as LTRIcon,
  PanelRightOpen as RTLIcon,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import { senitizeValue } from "@/utils/settings.utils";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";
import {
  selectLayoutTypeGlobal,
  selectLayoutTypeLocal,
} from "@/context/redux/setting/setting-selector";

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

const SettingLayout = () => {
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
    <SettingItem id="layout" title="Layout Settings">
      <SettingItemHorizontalLayout className="flex-col gap-4">
        <SettingItemHorizontalLayout className="items-center gap-2">
          <p className="flex-1">Change Layout</p>
          <SettingType value={settingType} onChange={handleChangeSettingType} />
        </SettingItemHorizontalLayout>
        {settingType === "custom" && (
          <SettingSelector
            value={String(senitizedValue)}
            onChange={handleChange}
          />
        )}
      </SettingItemHorizontalLayout>
    </SettingItem>
  );
};

interface SettingSelectorProps {
  value: string;
  onChange: (value?: string) => void;
}

const SettingSelector = ({ value, onChange }: SettingSelectorProps) => {
  return (
    <div className="w-full flex justify-center items-stretch gap-6">
      {layoutList.map(({ id, label, subLabel, Icon }) => (
        <motion.div
          key={id}
          className={cn(
            "w-fit min-w-40 p-4 rounded-lg border border-accent ring-2 ring-primary/20 flex flex-col gap-2.5 justify-center items-center text-center cursor-pointer hover:bg-accent/50 transition-all duration-100",
            {
              "bg-accent/80 ring-primary": value === id,
            }
          )}
          onClick={() => onChange(id)}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <Icon size={30} />
          <div className="flex flex-col items-center justify-center gap-1">
            <p>{label}</p>
            {subLabel && (
              <p className="text-xs text-muted-foreground">{subLabel}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SettingLayout;
