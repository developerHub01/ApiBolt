import SettingItemHorizontalLayout from "@/components/app/setting/content/SettingItemHorizontalLayout";
import SettingBackgroundImagesFolderPath from "@/components/app/setting/content/background/images/SettingBackgroundImagesFolderPath";
import SettingBackgroundImagesContent from "@/components/app/setting/content/background/images/SettingBackgroundImagesContent";
import type { TSettingTab } from "@/context/setting/SettingProvider";
import type { SettingType } from "@shared/types/setting.types";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  folderPath: string | null;
  thumbnails: Array<string>;
  activeTab: TSettingTab;
  settingType: SettingType;
  isOpen: boolean;
}

const SettingBackgroundImagesDetails = ({
  folderPath,
  thumbnails,
  activeTab,
  settingType,
  isOpen,
}: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          exit={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "top center",
          }}
        >
          <SettingItemHorizontalLayout className="flex-col justify-center items-center gap-4">
            <SettingBackgroundImagesFolderPath path={folderPath} />
            <SettingBackgroundImagesContent
              backgroundList={thumbnails}
              /* if images showing from project and global then short height */
              height={
                activeTab === "project" && settingType === "global"
                  ? "short"
                  : "long"
              }
            />
          </SettingItemHorizontalLayout>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingBackgroundImagesDetails;
