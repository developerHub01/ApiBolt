import { memo, useEffect } from "react";
import SettingItem from "@/components/app/setting/content/SettingItem";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingHttpStatusContent from "@/components/app/setting/content/http-status/SettingHttpStatusContent";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadHttpStatus } from "@/context/redux/http-status/thunks/http-status";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";

const SettingHttpStatus = memo(() => {
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(
        loadHttpStatus({
          once: true,
        })
      );
    })();
  }, [dispatch]);

  if (activeTab === "project") return null;

  return (
    <SettingItem id="httpStatus" title="Http Status Settings">
      <SettingItemContentWrapper className="gap-2">
        <SettingHttpStatusContent />
      </SettingItemContentWrapper>
    </SettingItem>
  );
});

export default SettingHttpStatus;
