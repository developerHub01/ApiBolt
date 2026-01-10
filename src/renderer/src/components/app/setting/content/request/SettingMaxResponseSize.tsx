import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useSetting } from "@/context/setting/SettingProvider";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectMaxResponseSizeGlobal,
  selectMaxResponseSizeLocal,
} from "@/context/redux/setting-request/selectors/setting";
import {
  DEFAULT_SETTINGS_REQUEST,
  MAX_MAX_RESPONSE_SIZE,
  MIN_MAX_RESPONSE_SIZE,
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

const SettingMaxResponseSize = () => {
  const dispatch = useAppDispatch();
  const { activeTab } = useSetting();
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const globalValue = useAppSelector(selectMaxResponseSizeGlobal);
  const localValue = useAppSelector(selectMaxResponseSizeLocal);

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
    defaultValue: DEFAULT_SETTINGS_REQUEST.maxResponseSize,
  });
  const [size, setSize] = useState<number>(
    Number.isNaN(Number(applyingValue))
      ? DEFAULT_SETTINGS_REQUEST.maxResponseSize!
      : Number(applyingValue),
  );

  const handleChange = useCallback(
    (unfiltetedValue?: string) => {
      const value = unfiltetedValue === "global" ? null : unfiltetedValue;
      dispatch(
        updateSettingsRequest({
          maxResponseSize:
            value as UpdateSettingsRequestInterface["maxResponseSize"],
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
      Math.min(Math.max(MIN_MAX_RESPONSE_SIZE, value), MAX_MAX_RESPONSE_SIZE),
    );
  }, []);

  const handleBlur = useCallback(() => {
    dispatch(
      updateSettingsRequest({
        maxResponseSize:
          size as UpdateSettingsRequestInterface["maxResponseSize"],
        projectId: activeTab === "project" ? activeProjectId : null,
      }),
    );
  }, [activeProjectId, activeTab, dispatch, size]);

  const isDisabled = senitizedValue !== "custom";

  return (
    <SettingItemHorizontalLayout className="items-center">
      <p className="flex-1">Max response size</p>
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
          placeholder="Select Max Response Size"
          label="Max Response Size"
        />
        <InfoTooltip
          label={`Min size ${MIN_MAX_RESPONSE_SIZE}  and max size ${MAX_MAX_RESPONSE_SIZE}`}
          align="end"
          buttonVariant={"transparent"}
          contentVariant={"outline"}
        />
      </div>
    </SettingItemHorizontalLayout>
  );
};

export default SettingMaxResponseSize;
