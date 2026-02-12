import { memo } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import { Button } from "@/components/ui/button";
import SettingRefresh from "@/components/app/setting/content/SettingRefresh";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingBackgroundProvider, {
  useSettingBackground,
} from "@/context/setting/background/SettingBackgroundProvider";
import SettingBackgroundImagesDetails from "@/components/app/setting/content/background/images/SettingBackgroundImagesDetails";
import { Separator } from "@/components/ui/separator";

const SettingBackgroundImages = () => {
  return (
    <SettingBackgroundProvider>
      <SettingBackgroundContent />
    </SettingBackgroundProvider>
  );
};

const SettingBackgroundContent = memo(() => {
  const { activeTab } = useSetting();
  const {
    settingType,
    senitizedValue,
    folderPath,
    thumbnails,
    isHideMoreData,
    handleChange,
    handleChangeSettingType,
  } = useSettingBackground();

  return (
    <>
      <SettingItemHorizontalLayout className="flex-col gap-4 justify-center">
        <SettingItemHorizontalLayout className="items-center gap-2">
          <p className="flex-1">Choose Background images</p>
          {/* render only if custom and have atleast selected folder. if have array means have selected folder */}
          <SettingRefresh
            label="Reload Background Images..."
            className="ml-auto"
            show={
              Array.isArray(senitizedValue) &&
              ["custom", "global"].includes(settingType)
            }
          />
          <SettingType value={settingType} onChange={handleChangeSettingType} />
        </SettingItemHorizontalLayout>
        {/* if type is custom or global and also if have children under the section then only render */}
        <SettingBackgroundImagesDetails
          isOpen={
            ["global", "custom"].includes(settingType) && Boolean(folderPath)
          }
          activeTab={activeTab}
          folderPath={folderPath}
          thumbnails={thumbnails}
          settingType={settingType}
        />
        {settingType === "custom" && (
          <SettingItemHorizontalLayout className="justify-center items-center">
            <Button
              onClick={() => handleChange("upload")}
              variant={"secondary"}
              className="capitalize"
            >
              Choose background folder
            </Button>
          </SettingItemHorizontalLayout>
        )}
      </SettingItemHorizontalLayout>
      {isHideMoreData || <Separator orientation="horizontal" />}
    </>
  );
});

export default SettingBackgroundImages;
