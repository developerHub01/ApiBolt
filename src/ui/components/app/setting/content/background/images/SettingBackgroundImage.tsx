import { memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SettingBackgroundImageprops {
  src: string;
}

const SettingBackgroundImage = memo(({ src }: SettingBackgroundImageprops) => {
  return (
    <motion.div
      className={cn(
        "size-full overflow-hidden aspect-square border border-accent rounded-lg flex justify-center items-center cursor-pointer bg-accent/20 hover:bg-accent/80 transition-all duration-100 ease-in-out shadow-lg"
      )}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.85 }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </motion.div>
  );
});

export default SettingBackgroundImage;
