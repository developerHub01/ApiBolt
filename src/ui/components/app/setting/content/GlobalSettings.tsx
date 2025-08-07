import SettingBackgroundImages from "./background/SettingBackgroundImages";
import SettingZoom from "./zoom/SettingZoom";
import SettingLayout from "./layout/SettingLayout";
import SettingCode from "./code/SettingCode";

const GlobalSettings = () => {
  return (
    <>
      <SettingBackgroundImages />
      <SettingZoom />
      <SettingLayout />
      <SettingCode />
    </>
  );
};

export default GlobalSettings;
