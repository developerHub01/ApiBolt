import { memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import ImageWithFallback from "@/components/ui/image-with-fallback";

interface SettingBackgroundImageprops {
  src: string;
  index: number;
  disabled?: boolean;
  isActive?: boolean;
}

const SettingBackgroundImage = memo(
  ({
    src,
    index,
    isActive = false,
    disabled = false,
  }: SettingBackgroundImageprops) => {
    return (
      <motion.div
        data-id={index}
        className={cn(
          "w-full h-full overflow-hidden aspect-square border-2 border-accent rounded-lg flex justify-center items-center cursor-pointer bg-accent/20 hover:bg-accent/80 transition-all duration-100 ease-in-out shadow-lg relative",
          {
            "border-accent/50 opacity-50 blur-in-sm before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:w-full before:h-full before:bg-gray-900/80 before:mix-blend-multiply before:rounded-lg before:scale-105 before:pointer-events-none":
              disabled,
            "border-primary": isActive,
          },
        )}
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 0.85 }}
        style={{
          aspectRatio: 1,
        }}
      >
        <ImageWithFallback
          src={src}
          alt="thumnail"
          className="w-full h-full object-cover blur-sm pointer-events-none"
          width="200"
          height="200"
          decoding="async"
          loading="lazy"
          onLoad={e => e.currentTarget.classList.remove("blur-sm")}
        />
      </motion.div>
    );
  },
);

export default SettingBackgroundImage;
