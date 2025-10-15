import { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Empty from "@/components/ui/empty";
import SettingBackgroundImagePreview from "@/components/app/setting/content/background/images/SettingBackgroundImagePreview";
import SettingBackgroundImageGrid from "@/components/app/setting/content/background/images/SettingBackgroundImageGrid";
import useCheckBackgroundSettingMaxNumberOfImages from "@/hooks/setting/use-check-background-setting-max-number-of-images";
import { cn } from "@/lib/utils";
import { useSettingBackground } from "@/context/setting/background/SettingBackgroundProvider";

interface Props {
  backgroundList: Array<string>;
  height?: "long" | "short";
}

const SettingBackgroundImagesContent = memo(
  ({ backgroundList, height = "long" }: Props) => {
    const { senitizedValue: maxNumberOfImages } =
      useCheckBackgroundSettingMaxNumberOfImages();
    const { selectedBackgroundImageIndex } = useSettingBackground();

    return (
      <AnimatePresence>
        {/* render only if have atleast selected folder. if have array means have selected folder */}
        {Array.isArray(backgroundList) && (
          <>
            {backgroundList.length ? (
              <motion.div
                layout
                className={cn("h-90 grid grid-cols-2 gap-4 overflow-hidden", {
                  "h-80": height === "short",
                })}
              >
                {/* LEFT GRID */}
                <SettingBackgroundImageGrid
                  maxNumberOfImages={maxNumberOfImages}
                  selectedIndex={selectedBackgroundImageIndex}
                  backgroundList={backgroundList}
                  className={cn({
                    "h-80": height === "short",
                  })}
                />
                {/* RIGHT PREVIEW */}
                <SettingBackgroundImagePreview
                  selectedIndex={selectedBackgroundImageIndex}
                  backgroundList={backgroundList}
                  className={cn({
                    "h-80": height === "short",
                  })}
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
      </AnimatePresence>
    );
  }
);

export default SettingBackgroundImagesContent;
