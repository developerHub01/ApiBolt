import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingZoomLevel from "@/components/app/setting/content/zoom/SettingZoomLevel";
import SettingIsZoomable from "@/components/app/setting/content/zoom/SettingIsZoomable";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";
import { Separator } from "@/components/ui/separator";

const SettingZoom = () => {
  return (
    <SettingItem id="zoom" title="Zoom Settings">
      <SettingItemContentWrapper>
        <SettingZoomLevel />
        <Separator orientation="horizontal" />
        <SettingIsZoomable />
      </SettingItemContentWrapper>
    </SettingItem>
  );
};

export default SettingZoom;
