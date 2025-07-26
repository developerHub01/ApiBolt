import SettingItem from "@/components/app/setting/content/SettingItem";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateSettings } from "@/context/redux/setting/setting-thunk";
import { useSetting } from "@/context/setting/SettingProvider";
import { cn } from "@/lib/utils";
import type { TLayoutSetting } from "@/types/setting.types";
import {
  PanelLeftClose as LTRIcon,
  PanelRightOpen as RTLIcon,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

const layoutList: Array<{
  id: TLayoutSetting;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "ltr",
    label: "Left To Right",
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
  const dispatch = useAppDispatch();
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
    activeTab === "global"
      ? layoutTypeGlobal
      : (layoutTypeLocal ?? layoutTypeGlobal ?? "ltr");

  const handleLayoutChange = (value: TLayoutSetting) => {
    if (value === layoutTypes) return;

    dispatch(
      updateSettings({
        layoutType: value,
        projectId: activeTab === "global" ? null : activeProjectId,
      })
    );
  };

  return (
    <SettingItem id="layout" title="Layout Settings">
      <div className="w-full flex flex-col gap-4">
        <p>Change Layout</p>
        <div className="w-full flex justify-center items-center gap-6">
          {layoutList.map(({ id, label, Icon }) => (
            <motion.div
              key={id}
              className={cn(
                "w-fit min-w-40 p-4 rounded-lg border border-accent ring-2 ring-primary/20 flex flex-col gap-2.5 justify-center items-center text-center cursor-pointer hover:bg-accent/50 transition-all duration-100",
                {
                  "bg-accent/80 ring-primary": layoutTypes === id,
                }
              )}
              onClick={() => handleLayoutChange(id)}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <Icon size={30} />
              <p>{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SettingItem>
  );
};

export default SettingLayout;
