import { memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SettingBackgroundImageprops {
  src: string;
  index: number;
  disabled?: boolean;
  isActive?: boolean;
  onClick: (index?: number) => void;
}

const SettingBackgroundImage = memo(
  ({
    src,
    index,
    isActive = false,
    disabled = false,
    onClick,
  }: SettingBackgroundImageprops) => {
    return (
      <motion.div
        className={cn(
          "w-full h-full overflow-hidden aspect-square border border-accent rounded-lg flex justify-center items-center cursor-pointer bg-accent/20 hover:bg-accent/80 transition-all duration-100 ease-in-out shadow-lg relative",
          {
            "border-accent/50 opacity-50 blur-in-sm before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:w-full before:h-full before:bg-gray-900 before:mix-blend-multiply before:rounded-lg before:scale-105":
              disabled,
            "ring-1.5 ring-primary": isActive,
          }
        )}
        onClick={() => onClick(index)}
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 0.85 }}
      >
        <img src={src} alt="" className="w-full h-full object-cover" />
      </motion.div>
    );
  }
);

export default SettingBackgroundImage;
