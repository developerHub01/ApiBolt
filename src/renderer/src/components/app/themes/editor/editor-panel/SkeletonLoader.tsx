import { Skeleton } from "@/components/ui/skeleton";
import ThemePaletteWrapper from "@/components/app/themes/editor/editor-panel/ThemePaletteWrapper";

const SkeletonLoader = () => {
  return (
    <ThemePaletteWrapper className="gap-4">
      {Array.from({ length: 14 }, (_, index) => (
        <Skeleton key={index} className="min-h-12" />
      ))}
    </ThemePaletteWrapper>
  );
};

export default SkeletonLoader;
