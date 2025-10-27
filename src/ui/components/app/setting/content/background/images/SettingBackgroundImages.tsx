import { memo } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SettingRefresh from "@/components/app/setting/content/SettingRefresh";
import SettingBackgroundImagesContent from "@/components/app/setting/content/background/images/SettingBackgroundImagesContent";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingBackgroundImagesFolderPath from "@/components/app/setting/content/background/images/SettingBackgroundImagesFolderPath";
import SettingBackgroundProvider, {
  useSettingBackground,
} from "@/context/setting/background/SettingBackgroundProvider";

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
    handleChange,
    isHideMoreData,
    handleChangeSettingType,
  } = useSettingBackground();

  return (
    <SettingItemHorizontalLayout
      className={cn("flex-col gap-4 justify-center border-b py-2.5", {
        "border-none": isHideMoreData,
      })}
    >
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
      {settingType === "global" &&
        (Boolean(folderPath) || Array.isArray(senitizedValue)) && (
          <SettingItemHorizontalLayout className="flex-col justify-center items-center gap-4">
            <SettingBackgroundImagesFolderPath path={folderPath} />
            <SettingBackgroundImagesContent
              backgroundList={senitizedValue as Array<string>}
              /* if images showing from project and global then short height */
              height={
                activeTab === "project" && settingType === "global"
                  ? "short"
                  : "long"
              }
            />
          </SettingItemHorizontalLayout>
        )}

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
  );
});

export default SettingBackgroundImages;
