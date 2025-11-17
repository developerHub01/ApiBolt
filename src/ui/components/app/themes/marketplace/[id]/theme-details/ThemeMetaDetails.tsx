import { memo } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { CloudDownload as DownloadIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ThemeMetaDetails = memo(() => {
  return (
    <section className="flex gap-5">
      <div className="size-40 rounded-md overflow-hidden shrink-0">
        <ImageWithFallback
          fallback="./theme-thumbnail/theme_thumbnail_placeholder.png"
          src="./theme-thumbnail/black_ocean.png"
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="w-full flex-1 flex flex-col gap-1.5">
        <p className="line-clamp-1 font-semibold text-xl">Theme name</p>
        <div className="w-full flex gap-2 text-sm">
          <Link
            to={"https://jsonplaceholder.typicode.com/"}
            className="font-semibold py-0.5"
          >
            author
          </Link>
          <Separator
            className="bg-border data-[orientation=vertical]:w-0.5"
            orientation="vertical"
          />
          <span className="flex items-center gap-0.5">
            <DownloadIcon size={14} /> 50
          </span>
        </div>
        <p className="w-full line-clamp-2 text-muted-foreground leading-relaxed text-sm pb-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          delectus quis dolorem commodi animi, qui accusantium consectetur
          expedita velit? Illum expedita quod veniam neque ratione quisquam
          molestias quam consequatur minus!
        </p>
        <Button variant={"secondary"} size={"sm"} className="self-start">
          Install
        </Button>
      </div>
    </section>
  );
});

export default ThemeMetaDetails;
