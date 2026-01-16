import { useMemo } from "react";
import { useSetting } from "@/context/setting/SettingProvider";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectSslVerificationGlobal,
  selectSslVerificationLocal,
} from "@/context/redux/setting-request/selectors/setting";
import { DEFAULT_SETTINGS_REQUEST } from "@/constant/settings-request.constant";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingOptionSelector from "@/components/app/setting/content/SettingOptionSelector";
import { updateSettingsRequest } from "@/context/redux/setting-request/thunks/setting";
import { UpdateSettingsRequestInterface } from "@shared/types/setting-request.types";
import useCheckApplyingSetting from "@/hooks/setting/request/use-check-applyingSetting";
import { Button } from "@/components/ui/button";
import { TValueType } from "@/components/app/setting/content/request/boolean-based-select/types/index";
import {
  getPresentableToReal,
  getRealToPresentable,
} from "@/components/app/setting/content/request/boolean-based-select/utils/index";

const localOptions: Array<TValueType> = ["default", "global", "on", "off"];
const globalOptions: Array<TValueType> = ["default", "on", "off"];

const SettingSslVerification = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const globalValue = useAppSelector(selectSslVerificationGlobal);
  const localValue = useAppSelector(selectSslVerificationLocal);

  const senitizedValue = useMemo(() => {
    const value =
      activeTab === "project"
        ? localValue
          ? localValue
          : "global"
        : (globalValue ?? "default");

    return getRealToPresentable(value);
  }, [activeTab, globalValue, localValue]);

  const applyingValue = useCheckApplyingSetting({
    localValue,
    globalValue,
    activeTab,
    defaultValue: DEFAULT_SETTINGS_REQUEST.sslVerification,
  });
  const presentableApplyingValue = getRealToPresentable(applyingValue);

  const handleChange = (unfiltetedValue?: string) => {
    const value = getPresentableToReal(
      unfiltetedValue === "global" ? null : unfiltetedValue,
    );
    dispatch(
      updateSettingsRequest({
        sslVerification:
          value as UpdateSettingsRequestInterface["sslVerification"],
        projectId: activeTab === "project" ? activeProjectId : null,
      }),
    );
  };

  return (
    <SettingItemHorizontalLayout className="items-center">
      <p className="flex-1">SSL verification</p>
      <div className="flex items-center gap-2">
        {["default", "global"].includes(senitizedValue) && (
          <Button variant="outline" disabled size={"sm"} className="capitalize">
            {presentableApplyingValue}
          </Button>
        )}
        <SettingOptionSelector
          list={activeTab === "project" ? localOptions : globalOptions}
          value={senitizedValue}
          onChange={handleChange}
          placeholder="Select SSL Verification"
          label="SSL Verification"
        />
      </div>
    </SettingItemHorizontalLayout>
  );
};

export default SettingSslVerification;
