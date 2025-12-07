import { lazy, memo, Suspense, useEffect } from "react";
import SettingItem from "@/components/app/setting/content/SettingItem";
import { useSetting } from "@/context/setting/SettingProvider";
const SettingHttpStatusContent = lazy(
  () =>
    import("@/components/app/setting/content/http-status/SettingHttpStatusContent"),
);
import { useAppDispatch } from "@/context/redux/hooks";
import { loadHttpStatus } from "@/context/redux/http-status/thunks/http-status";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";
import StatuCodeFallback from "@/fallback/settings/status-code/StatuCodeFallback";

const SettingHttpStatus = memo(() => {
  const { activeTab } = useSetting();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(
        loadHttpStatus({
          once: true,
        }),
      );
    })();
  }, [dispatch]);

  if (activeTab === "project") return null;

  return (
    <SettingItem id="httpStatus" title="Http Status Settings">
      <SettingItemContentWrapper className="gap-2">
        <Suspense fallback={<StatuCodeFallback />}>
          <SettingHttpStatusContent />
        </Suspense>
      </SettingItemContentWrapper>
    </SettingItem>
  );
});

export default SettingHttpStatus;
