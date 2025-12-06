import { memo } from "react";
import type { ThemeMetaInterface } from "@shared/types/theme.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ImageOff as ImageBroken,
  ArrowUpRight as LinkArrowIcon,
  User as UserIcon,
} from "lucide-react";
import { useSettingTheme } from "@/context/setting/theme/SettingThemeProvider";
import SettingThemeCardWrapper from "@/components/app/setting/content/theme/SettingThemeCardWrapper";
import { useSetting } from "@/context/setting/SettingProvider";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { DEFAULT_THUMBNAIL_FALLBACK } from "@/constant/theme.constant";

const SettingThemeCard = memo(
  ({ id, thumbnail, name, type, author, url }: ThemeMetaInterface) => {
    const { activeThemeId, localThemeId, handleChangeActiveTheme } =
      useSettingTheme();
    const { activeTab } = useSetting();
    const isActive = activeThemeId === id;
    /**
     * if the active theme coming from global because of non-existing of local active theme
     */
    const isInheritedFrom =
      isActive && !localThemeId && activeTab === "project";

    const handleClick = () => {
      if (isActive && !isInheritedFrom) return;
      handleChangeActiveTheme(id);
    };

    return (
      <SettingThemeCardWrapper
        key={id}
        isActive={isActive}
        isInheritedFrom={isInheritedFrom}
        onClick={handleClick}
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
        <h4 className="capitalize text-base font-medium">{name}</h4>
        <div className="flex items-center gap-1.5 capitalize text-muted-foreground text-sm">
          {Boolean(author) && (
            <p className="inline-flex items-center gap-1 mr-auto">
              <UserIcon size={14} /> {author}
            </p>
          )}
          <Badge variant={"outline"} className="capitalize">
            {type}
          </Badge>
          {Boolean(url) && (
            <Link to={url!} target="_blank">
              <Button
                size="iconXs"
                variant={"ghost"}
                className="rounded-full"
                onClick={e => e.stopPropagation()}
              >
                <LinkArrowIcon />
              </Button>
            </Link>
          )}
        </div>
      </SettingThemeCardWrapper>
    );
  },
);

export default SettingThemeCard;
