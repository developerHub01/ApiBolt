import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useSetting } from "@/context/setting/SettingProvider";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectRequestTimeoutGlobal,
  selectRequestTimeoutLocal,
} from "@/context/redux/setting-request/selectors/setting";
import {
  DEFAULT_SETTINGS_REQUEST,
  MAX_REQUEST_TIMEOUT,
  MIN_REQUEST_TIMEOUT,
} from "@/constant/settings-request.constant";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingOptionSelector from "@/components/app/setting/content/SettingOptionSelector";
import { updateSettingsRequest } from "@/context/redux/setting-request/thunks/setting";
import { UpdateSettingsRequestInterface } from "@shared/types/setting-request.types";
import useCheckApplyingSetting from "@/hooks/setting/request/use-check-applyingSetting";
import SettingRequestInput from "@/components/app/setting/content/request/SettingRequestInput";
import { cn } from "@/lib/utils";
import InfoTooltip from "@/components/app/setting/InfoTooltip";

const localOptions = ["default", "global", "custom"];
const globalOptions = ["default", "custom"];

const SettingRequestTimeout = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const globalValue = useAppSelector(selectRequestTimeoutGlobal);
  const localValue = useAppSelector(selectRequestTimeoutLocal);

  const senitizedValue = useMemo(() => {
    const value =
      activeTab === "project"
        ? localValue
          ? localValue
          : "global"
        : globalValue && globalValue !== -1
          ? globalValue
          : "default";

    if (value !== "global" && value !== "default") return "custom";
    return value;
  }, [activeTab, globalValue, localValue]);

  const applyingValue = useCheckApplyingSetting({
    localValue,
    globalValue,
    activeTab,
    defaultValue: DEFAULT_SETTINGS_REQUEST.requestTimeout,
  });
  const [size, setSize] = useState<number>(
    Number.isNaN(Number(applyingValue))
      ? DEFAULT_SETTINGS_REQUEST.requestTimeout!
      : Number(applyingValue),
  );

  const handleChange = useCallback(
    (unfiltetedValue?: string) => {
      const value = unfiltetedValue === "global" ? null : unfiltetedValue;
      dispatch(
        updateSettingsRequest({
          requestTimeout:
            value as UpdateSettingsRequestInterface["requestTimeout"],
          projectId: activeTab === "project" ? activeProjectId : null,
        }),
      );
    },
    [activeProjectId, activeTab, dispatch],
  );

  const handleChangeSize = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return e.preventDefault();
    setSize(
      Math.min(Math.max(MIN_REQUEST_TIMEOUT, value), MAX_REQUEST_TIMEOUT),
    );
  }, []);

  const handleBlur = useCallback(() => {
    dispatch(
      updateSettingsRequest({
        requestTimeout:
          size as UpdateSettingsRequestInterface["requestTimeout"],
        projectId: activeTab === "project" ? activeProjectId : null,
      }),
    );
  }, [activeProjectId, activeTab, dispatch, size]);

  const isDisabled = senitizedValue !== "custom";

  return (
    <SettingItemHorizontalLayout className="items-center">
      <p className="flex-1">Request timeout</p>
      <div className="flex items-center gap-2">
        <SettingRequestInput
          id="max-response-size"
          label={"MB"}
          value={String(isDisabled ? applyingValue : size)}
          onChange={handleChangeSize}
          className={cn({
            "pointer-events-none opacity-50": isDisabled,
          })}
          onBlur={handleBlur}
        />
        <SettingOptionSelector
          list={activeTab === "project" ? localOptions : globalOptions}
          value={senitizedValue}
          onChange={handleChange}
          placeholder="Select Request Timeout"
          label="Request Timeout"
        />
        <InfoTooltip
          label={`Min time ${MIN_REQUEST_TIMEOUT} and max time ${MAX_REQUEST_TIMEOUT.toLocaleString()}`}
          align="end"
          buttonVariant={"transparent"}
          contentVariant={"outline"}
        />
      </div>
    </SettingItemHorizontalLayout>
  );
};

export default SettingRequestTimeout;
