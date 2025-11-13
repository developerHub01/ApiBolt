import { memo } from "react";
import type { ThemeMetaInterface } from "@/types/theme.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ImageOff as ImageBroken,
  ArrowUpRight as LinkArrowIcon,
  User as UserIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSettingTheme } from "@/context/setting/theme/SettingThemeProvider";

const SettingThemeCard = memo(
  ({ id, thumbnail, name, type, author }: ThemeMetaInterface) => {
    const { activeThemeId, handleChangeActiveTheme } = useSettingTheme();
    const isActive = activeThemeId === id;

    const handleClick = () => !isActive && handleChangeActiveTheme(id);

    return (
      <motion.div
        key={id}
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
          "w-full flex flex-col gap-2 rounded-xl bg-transparent hover:bg-secondary/30 transition-all duration-100",
          {
            "bg-secondary/30 ring-1 ring-offset-1": isActive,
          }
        )}
        onClick={handleClick}
      >
        <div
          className={cn(
            "w-full aspect-square bg-accent rounded-xl overflow-hidden border",
            {
              border: !thumbnail,
            }
          )}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`${name}_thumbnail`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <ImageBroken size={40} />
            </div>
          )}
        </div>
        <h4 className="capitalize text-base font-medium">{name}</h4>
        <div className="flex items-center gap-1.5">
          {Boolean(author) && (
            <p className="inline-flex items-center gap-1 mr-auto text-sm">
              <UserIcon size={14} /> {author}
            </p>
          )}
          <Badge variant={"outline"} className="capitalize">
            {type}
          </Badge>
          <Button size="iconXs" variant={"ghost"} className="rounded-full">
            <LinkArrowIcon />
          </Button>
        </div>
      </motion.div>
    );
  }
);

export default SettingThemeCard;
