import type { MouseEvent } from "react";
import { motion } from "motion/react";
import type { ThemeMetaInterface } from "@shared/types/theme.types";
import { cn } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { DEFAULT_THUMBNAIL_FALLBACK } from "@/constant/theme.constant";
import { ImageOff as ImageBroken } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props extends ThemeMetaInterface {
  isActive: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const ThemeCard = ({ id, name, thumbnail, type, isActive, onClick }: Props) => {
  return (
    <motion.div
      whileHover={{
        padding: 15,
      }}
      animate={{
        padding: isActive ? 15 : 0,
        scale: isActive ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={cn(
        "w-full flex flex-col gap-2 rounded-xl bg-transparent cursor-pointer",
        "hover:bg-secondary/40 transition-all duration-100",
        {
          "bg-secondary/80 shadow-2xl ring ring-primary ring-offset-1":
            isActive,
        }
      )}
      id={id}
      onClick={onClick}
    >
      <div className="w-full aspect-square bg-accent rounded-xl overflow-hidden border">
        {thumbnail ? (
          <ImageWithFallback
            src={thumbnail}
            alt={`${name}_thumbnail`}
            fallback={DEFAULT_THUMBNAIL_FALLBACK}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <ImageBroken size={40} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-1.5 capitalize">
        <h4 className="text-base font-medium line-clamp-1">{name}</h4>
        <Badge variant={"outline"} className="text-muted-foreground text-sm">
          {type}
        </Badge>
      </div>
    </motion.div>
  );
};

export default ThemeCard;
