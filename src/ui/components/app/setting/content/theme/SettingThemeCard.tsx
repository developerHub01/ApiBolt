import { memo } from "react";
import type { ThemeMetaInterface } from "@/types/theme.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ImageOff as ImageBroken,
  ArrowUpRight as LinkArrowIcon,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettingTheme } from "@/context/setting/theme/SettingThemeProvider";
import SettingThemeCardWrapper from "@/components/app/setting/content/theme/SettingThemeCardWrapper";

const SettingThemeCard = memo(
  ({ id, thumbnail, name, type, author }: ThemeMetaInterface) => {
    const { activeThemeId, localThemeId, handleChangeActiveTheme } =
      useSettingTheme();
    const isActive = activeThemeId === id;
    /**
     * if the active theme coming from global because of non-existing of local active theme
     */
    const isSemiActive = isActive && !localThemeId;

    const handleClick = () => {
      if (isActive !== isSemiActive) return;
      handleChangeActiveTheme(id);
    };

    return (
      <SettingThemeCardWrapper
        isActive={isActive}
        key={id}
        className={cn({
          "bg-secondary/30 ring-1": isActive,
          "ring-ring": isActive,
          "ring-ring/5": isSemiActive,
        })}
        onClick={handleClick}
      >
        <div
          className={cn(
            "w-full aspect-square bg-accent rounded-xl overflow-hidden border"
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
          <Button
            size="iconXs"
            variant={"ghost"}
            className="rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <LinkArrowIcon />
          </Button>
        </div>
      </SettingThemeCardWrapper>
    );
  }
);

export default SettingThemeCard;
