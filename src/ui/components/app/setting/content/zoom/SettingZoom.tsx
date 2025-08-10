import SettingItem from "@/components/app/setting/content/SettingItem";
import SettingZoomLevel from "@/components/app/setting/content/zoom/SettingZoomLevel";
import SettingIsZoomable from "@/components/app/setting/content/zoom/SettingIsZoomable";

const SettingZoom = () => {
  return (
    <SettingItem id="zoom" title="Zoom Settings">
      <div className="w-full flex flex-col">
        <SettingZoomLevel />
        <SettingIsZoomable />
      </div>
    </SettingItem>
  );
};

export default SettingZoom;
