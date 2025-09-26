import { memo, useEffect } from "react";
import SettingItem from "@/components/app/setting/content/SettingItem";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingHttpStatusContent from "@/components/app/setting/content/http-status/SettingHttpStatusContent";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadHttpStatus } from "@/context/redux/http-status/thunk/http-status";

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
      <SettingHttpStatusContent />
    </SettingItem>
  );
});

export default SettingHttpStatus;
