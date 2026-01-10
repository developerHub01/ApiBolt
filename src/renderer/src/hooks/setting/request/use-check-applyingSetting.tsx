import { TSettingTab } from "@/context/setting/SettingProvider";

interface Props {
  globalValue: string | number | null;
  localValue: string | number | null;
  defaultValue: string | number | null;
  activeTab: TSettingTab;
}

const useCheckApplyingSetting = ({
  globalValue,
  localValue,
  defaultValue,
  activeTab,
}: Props) => {
  const applyingGlobal =
    globalValue !== null && globalValue !== -1 && globalValue !== "default"
      ? globalValue
      : defaultValue;

  const applyingLocal =
    localValue !== null && globalValue !== -1
      ? localValue === "default"
        ? defaultValue
        : localValue
      : applyingGlobal;

  return activeTab === "project" ? applyingLocal : applyingGlobal;
};

export default useCheckApplyingSetting;
