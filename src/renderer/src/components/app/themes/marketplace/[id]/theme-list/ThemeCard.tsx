import { memo } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { cn } from "@/lib/utils";
import { CloudDownload as DownloadIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Props {
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

const ThemeCard = memo(({  isSelected, onClick }: Props) => {
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
          src="./theme-thumbnail/black_ocean.png"
          alt=""
          className="size-full object-cover"
        />
      </AspectRatio>

      <div className="w-full flex-1 flex flex-col gap-2">
        <h3 className="line-clamp-1 font-medium">Theme name</h3>
        <p className="w-full line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          delectus quis dolorem commodi animi, qui accusantium consectetur
          expedita velit? Illum expedita quod veniam neque ratione quisquam
          molestias quam consequatur minus!
        </p>
        <div className="flex justify-between items-center gap-3">
          <p className="font-semibold text-xs py-0.5">author</p>
          <span className="flex items-center gap-0.5 text-xs">
            <DownloadIcon size={12} /> 50
          </span>
        </div>
      </div>
    </div>
  );
});

export default ThemeCard;
