import { memo } from "react";
import SettingHttpStatusSelector from "@/components/app/setting/content/http-status/SettingHttpStatusSelector";

const SettingHttpStatusContent = memo(() => {
  return (
    <div className="w-full flex flex-col">
      <SettingHttpStatusSelector />
    </div>
  );
});

export default SettingHttpStatusContent;
