import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  X as CloseIcon,
  ChevronLeft as LeftArrowIcon,
  ChevronRight as RightArrowIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettingBackground } from "@/context/setting/background/SettingBackgroundProvider";

interface Props {
  backgroundList: Array<string>;
  selectedIndex: number | null;
  className?: string;
}

const SettingBackgroundImagePreview = memo(
  ({ backgroundList, selectedIndex, className = "" }: Props) => {
    const {
      handleChangeSelectedBackgroundImageIndex,
      handleNavigateSelectedBackgroundImageIndex,
    } = useSettingBackground();

    return (
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div
            className={cn(
              "bg-accent/50 col-span-1 h-90 origin-center overflow-hidden rounded-lg relative flex flex-col p-3",
              className
            )}
            initial={{ scale: 0.6, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0)" }}
            exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Close Button */}
            <Button
              variant="secondary"
              size="iconXs"
              onClick={() => handleChangeSelectedBackgroundImageIndex()}
              className="absolute top-1 right-1 z-10"
            >
              <CloseIcon />
            </Button>
            {/* Container for image and navigation */}
            <div className="flex flex-col flex-grow gap-3 overflow-hidden">
              {/* Image wrapper with flex-grow to fill space */}
              <div
                className="flex-grow flex justify-center items-center overflow-hidden perspective-distant"
                style={{
                  perspective: 1500,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedIndex}
                    src={backgroundList[selectedIndex]}
                    alt="background-preview"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-xl blur-sm"
                    style={{ transformStyle: "preserve-3d" }}
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
                    initial={{
                      scale: 0.6,
                      opacity: 0.5,
                      rotateX: 50,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotateX: 0,
                      filter: "blur(0)",
                    }}
                    exit={{
                      scale: 0.8,
                      opacity: 0.5,
                      filter: "blur(5px)",
                      rotateX: -50,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    whileHover={{ scale: 0.97 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </AnimatePresence>
              </div>
              {/* Navigation buttons */}
              <div className="flex justify-center items-center gap-5 shrink-0">
                <Button
                  variant="secondary"
                  size="iconSm"
                  onClick={() =>
                    handleNavigateSelectedBackgroundImageIndex("left")
                  }
                >
                  <LeftArrowIcon />
                </Button>
                <Button
                  variant="secondary"
                  size="iconSm"
                  onClick={() =>
                    handleNavigateSelectedBackgroundImageIndex("right")
                  }
                >
                  <RightArrowIcon />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default SettingBackgroundImagePreview;
