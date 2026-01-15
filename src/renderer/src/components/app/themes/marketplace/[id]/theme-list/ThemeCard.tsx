import { memo, useMemo } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { cn } from "@/lib/utils";
import { CloudDownload as DownloadIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ThemeMetaInterface } from "@shared/types/theme.types";
import { Badge } from "@/components/ui/badge";
import { ButtonGroup } from "@/components/ui/button-group";

interface Props extends ThemeMetaInterface {
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

const ThemeCard = memo(
  ({
    isSelected,
    onClick,
    name,
    description,
    author,
    install_count,
    type,
    thumbnail,
  }: Props) => {
    const presentableDescription = useMemo(
      () => description.slice(0, 150),
      [description],
    );

    return (
      <div
        onClick={onClick}
        className={cn(
          "w-full rounded-lg p-4 flex flex-col gap-3 cursor-pointer",
          "transition-all duration-100",
          {
            "bg-accent/80 ring-2 ring-primary": isSelected,
            "bg-accent/20 hover:bg-accent/50": !isSelected,
          },
        )}
      >
        <AspectRatio
          ratio={16 / 9}
          className="rounded-lg overflow-hidden shrink-0 border-3"
        >
          <ImageWithFallback
            fallback="./theme-thumbnail/theme_thumbnail_placeholder.png"
            src={thumbnail}
            alt=""
            className="size-full object-cover"
          />
        </AspectRatio>

        <div className="w-full flex-1 flex flex-col gap-2">
          <h3 className="line-clamp-1 font-medium capitalize">{name}</h3>
          <p className="w-full line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {presentableDescription}
          </p>
          <div className="flex items-center gap-3">
            {Boolean(author) && (
              <p className="font-semibold text-xs py-0.5 underline">{author}</p>
            )}
            <span className="flex-1"></span>
            <ButtonGroup className="divide-x">
              {Boolean(type) && (
                <Badge variant={"default"} className="capitalize border-accent">
                  {type}
                </Badge>
              )}
              {typeof install_count === "number" && (
                <Badge className="border-accent">
                  <DownloadIcon size={12} /> {install_count}
                </Badge>
              )}
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  },
);

export default ThemeCard;
