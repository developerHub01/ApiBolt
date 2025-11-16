import { memo } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { cn } from "@/lib/utils";
import { CloudDownload as DownloadIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface Props {
  id: string;
}

const ThemeCard = memo(({ id }: Props) => {
  const { id: activeId } = useParams<{ id?: string }>();

  return (
    <Link to="/themes/marketplace/99">
      <div
        className={cn("w-full p-2 px-2.5 flex gap-3", {
          "bg-accent/80": activeId === id,
          "bg-transparent hover:bg-accent/50": activeId !== id,
        })}
      >
        <div className="size-20 rounded-md overflow-hidden shrink-0">
          <ImageWithFallback
            fallback="./theme-thumbnail/theme_thumbnail_placeholder.png"
            src="./theme-thumbnail/black_ocean.png"
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="w-full flex-1 flex-col gap-1.5">
          <div className="w-full flex gap-1">
            <p className="flex-1 line-clamp-1 font-medium">
              Theme name
            </p>
            <span className="flex items-center gap-0.5 text-xs">
              <DownloadIcon size={12} /> 50
            </span>
          </div>
          <p className="w-full line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            delectus quis dolorem commodi animi, qui accusantium consectetur
            expedita velit? Illum expedita quod veniam neque ratione quisquam
            molestias quam consequatur minus!
          </p>
          <Link
            to={"https://jsonplaceholder.typicode.com/"}
            className="font-semibold text-xs py-0.5"
          >
            author
          </Link>
        </div>
      </div>
    </Link>
  );
});

export default ThemeCard;
