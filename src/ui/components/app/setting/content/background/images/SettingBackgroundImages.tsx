import { useCallback, useState } from "react";
import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingType from "@/components/app/setting/SettingTypeSelector";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCheckBackgroundSettingImages from "@/hooks/setting/use-check-background-setting-images";
import useCheckBackgroundSettingMaxNumberOfImages from "@/hooks/setting/use-check-background-setting-max-number-of-images";
import { motion } from "motion/react";
import SettingRefresh from "@/components/app/setting/content/SettingRefresh";
import Empty from "@/components/ui/empty";
import SettingBackgroundImagePreview from "@/components/app/setting/content/background/images/SettingBackgroundImagePreview";
import SettingBackgroundImageGrid from "@/components/app/setting/content/background/images/SettingBackgroundImageGrid";

const SettingBackgroundImages = () => {
  const {
    settingType,
    senitizedValue,
    handleChange,
    isHideMoreData,
    handleChangeSettingType,
  } = useCheckBackgroundSettingImages();

  const { senitizedValue: maxNumberOfImages } =
    useCheckBackgroundSettingMaxNumberOfImages();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleChangeIndex = useCallback(
    (index?: number) => setSelectedIndex(index ?? null),
    []
  );

  return (
    <SettingItemHorizontalLayout
      className={cn("flex-col gap-4 justify-center border-b py-2.5", {
        "border-none": isHideMoreData,
      })}
    >
      <SettingItemHorizontalLayout className="items-center gap-2">
        <p className="flex-1">Choose Background images</p>
        {/* render only if custom and have atleast selected folder. if have array means have selected folder */}
        {settingType === "custom" && Array.isArray(senitizedValue) && (
          <SettingRefresh
            label="Reload Background Images..."
            className="ml-auto"
          />
        )}
        <SettingType value={settingType} onChange={handleChangeSettingType} />
      </SettingItemHorizontalLayout>
      {settingType === "custom" && (
        <SettingItemHorizontalLayout className="flex-col justify-center items-center gap-4">
          {/* render only if have atleast selected folder. if have array means have selected folder */}
          {Array.isArray(senitizedValue) && (
            <>
              {senitizedValue.length ? (
                <motion.div
                  layout
                  className="h-90 grid grid-cols-2 gap-4 overflow-hidden"
                >
                  {/* LEFT GRID */}
                  <SettingBackgroundImageGrid
                    maxNumberOfImages={maxNumberOfImages}
                    onClick={handleChangeIndex}
                    selectedIndex={selectedIndex}
                    backgroundList={senitizedValue}
                  />
                  {/* RIGHT PREVIEW */}
                  <SettingBackgroundImagePreview
                    onClose={handleChangeIndex}
                    selectedIndex={selectedIndex}
                    backgroundList={senitizedValue}
                  />
                </motion.div>
              ) : (
                <Empty
                  label="No images found"
                  description="Your registerd folder is currently empty. Please add images in the folder and refresh background images setting."
                  animationSrc="./lottie/nodata.lottie"
                  showFallback
                  className="h-full"
                  key="no-background-images"
                />
              )}
            </>
          )}
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
};

export default SettingBackgroundImages;
