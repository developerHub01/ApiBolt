import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";
import { Separator } from "@/components/ui/separator";
import SettingHttpVersion from "@/components/app/setting/content/request/SettingHttpVersion";
import SettingRequestTimeout from "@/components/app/setting/content/request/SettingRequestTimeout";
import SettingMaxResponseSize from "@/components/app/setting/content/request/SettingMaxResponseSize";
import SettingSslVerification from "@/components/app/setting/content/request/boolean-based-select/SettingSslVerification";
import SettingCookieTracking from "@/components/app/setting/content/request/boolean-based-select/SettingCookieTracking";

const SettingRequest = () => {
  return null;

  return (
    <SettingItem id="request" title="Request Settings">
      <SettingItemContentWrapper>
        <SettingHttpVersion />
        <Separator orientation="horizontal" />
        <SettingRequestTimeout />
        <Separator orientation="horizontal" />
        <SettingMaxResponseSize />
        <Separator orientation="horizontal" />
        <SettingSslVerification />
        <Separator orientation="horizontal" />
        <SettingCookieTracking />
      </SettingItemContentWrapper>
    </SettingItem>
  );
};

export default SettingRequest;
