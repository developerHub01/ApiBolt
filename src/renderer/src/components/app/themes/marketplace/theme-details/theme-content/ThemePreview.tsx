import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";

const ThemePreview = () => {
  const themeDetails = useAppSelector(selectSelectedThemeDetails);
  if (!themeDetails) return null;
  const { name, preview } = themeDetails;

  return (
    <AspectRatio
      ratio={16 / 9}
      className="rounded-lg overflow-hidden shrink-0 border-3 bg-background"
    >
      <ImageWithFallback
        fallback="./theme-thumbnail/theme_thumbnail_placeholder.png"
        src={preview}
        alt={name}
        className="size-full object-cover"
      />
    </AspectRatio>
  );
};

export default ThemePreview;
