import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  backgroundList: Array<string>;
  selectedIndex: number | null;
  onClose: (index?: number) => void;
  className?: string;
}

const SettingBackgroundImagePreview = memo(
  ({ backgroundList, selectedIndex, onClose, className = "" }: Props) => {
    return (
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div
            key={selectedIndex}
            className={cn(
              "bg-accent/50 col-span-1 h-90 origin-center overflow-hidden rounded-lg p-3 relative",
              className
            )}
            initial={{
              scale: 0.6,
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0)",
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <Button
              variant={"ghost"}
              size={"iconXs"}
              onClick={() => onClose()}
              className="rounded-full absolute top-1.5 right-1.5"
            >
              <CloseIcon />
            </Button>
            <img
              src={backgroundList[selectedIndex]}
              alt="background-preview"
              className="w-full h-full object-contain rounded-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default SettingBackgroundImagePreview;
