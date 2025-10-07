import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingZoomLevel from "@/components/app/setting/content/zoom/SettingZoomLevel";
import SettingIsZoomable from "@/components/app/setting/content/zoom/SettingIsZoomable";
import SettingItemContentWrapper from "@/components/app/setting/content/SettingItemContentWrapper";

const SettingZoom = () => {
  return (
    <SettingItem id="zoom" title="Zoom Settings">
      <SettingItemContentWrapper>
        <SettingZoomLevel />
        <SettingIsZoomable />
      </SettingItemContentWrapper>
    </SettingItem>
  );
};

export default SettingZoom;
