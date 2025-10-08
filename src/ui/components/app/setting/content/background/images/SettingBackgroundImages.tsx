import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCheckBackgroundSettingImages from "@/hooks/setting/use-check-background-setting-images";
import SettingRefresh from "@/components/app/setting/content/SettingRefresh";
import SettingBackgroundImagesContent from "@/components/app/setting/content/background/images/SettingBackgroundImagesContent";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingBackgroundImagesFolderPath from "@/components/app/setting/content/background/images/SettingBackgroundImagesFolderPath";

const SettingBackgroundImages = () => {
  const { activeTab } = useSetting();
  const {
    settingType,
    senitizedValue,
    folderPath,
    handleChange,
    isHideMoreData,
    handleChangeSettingType,
  } = useCheckBackgroundSettingImages();

  return (
    <SettingItemHorizontalLayout
      className={cn("flex-col gap-4 justify-center border-b py-2.5", {
        "border-none": isHideMoreData,
      })}
    >
      <SettingItemHorizontalLayout className="items-center gap-2">
        <p className="flex-1">Choose Background images</p>
        {/* render only if custom and have atleast selected folder. if have array means have selected folder */}
        {["custom", "global"].includes(settingType) &&
          Array.isArray(senitizedValue) && (
            <SettingRefresh
              label="Reload Background Images..."
              className="ml-auto"
            />
          )}
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {["custom", "global"].includes(settingType) && (
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
          {settingType === "custom" && (
            <Button
              onClick={() => handleChange("upload")}
              variant={"secondary"}
              className="capitalize"
            >
              Choose background folder
            </Button>
          )}
        </SettingItemHorizontalLayout>
      )}
    </SettingItemHorizontalLayout>
  );
};

export default SettingBackgroundImages;
