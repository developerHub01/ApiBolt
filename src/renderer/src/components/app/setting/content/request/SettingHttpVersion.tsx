import { useMemo } from "react";
import { useSetting } from "@/context/setting/SettingProvider";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectHttpVersionGlobal,
  selectHttpVersionLocal,
} from "@/context/redux/setting-request/selectors/setting";
import { DEFAULT_SETTINGS_REQUEST } from "@/constant/settings-request.constant";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingOptionSelector from "@/components/app/setting/content/SettingOptionSelector";
import { HTTP_VERSIONS } from "@shared/constant";
import { updateSettingsRequest } from "@/context/redux/setting-request/thunks/setting";
import { UpdateSettingsRequestInterface } from "@shared/types/setting-request.types";
import useCheckApplyingSetting from "@/hooks/setting/request/use-check-applyingSetting";
import { Button } from "@/components/ui/button";

const localOptions = ["default", "global", ...HTTP_VERSIONS];
const globalOptions = ["default", ...HTTP_VERSIONS];

const SettingHttpVersion = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const globalValue = useAppSelector(selectHttpVersionGlobal);
  const localValue = useAppSelector(selectHttpVersionLocal);

  const senitizedValue = useMemo(() => {
    return activeTab === "project"
      ? localValue
        ? localValue
        : "global"
      : (globalValue ?? "default");
  }, [activeTab, globalValue, localValue]);

  const applyingValue = useCheckApplyingSetting({
    localValue,
    globalValue,
    activeTab,
    defaultValue: DEFAULT_SETTINGS_REQUEST.httpVersion,
  });

  const handleChange = (unfiltetedValue?: string) => {
    const value = unfiltetedValue === "global" ? null : unfiltetedValue;
    dispatch(
      updateSettingsRequest({
        httpVersion: value as UpdateSettingsRequestInterface["httpVersion"],
        projectId: activeTab === "project" ? activeProjectId : null,
      }),
    );
  };

  return (
    <SettingItemHorizontalLayout className="items-center">
      <p className="flex-1">HTTP version</p>
      <div className="flex items-center gap-2">
        {["default", "global"].includes(senitizedValue) && (
          <Button variant="outline" disabled size={"sm"} className="capitalize">
            {applyingValue}
          </Button>
        )}
        <SettingOptionSelector
          list={activeTab === "project" ? localOptions : globalOptions}
          value={senitizedValue}
          onChange={handleChange}
          placeholder="Select HTTP Version"
          label="HTTP Version"
        />
      </div>
    </SettingItemHorizontalLayout>
  );
};

export default SettingHttpVersion;
