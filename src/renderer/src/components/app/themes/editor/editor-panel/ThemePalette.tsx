import { memo } from "react";
import { cn } from "@/lib/utils";
import type { ThemeColorId } from "@shared/types/theme.types";
import ThemeEditorColor from "@/components/app/themes/editor/editor-panel/ThemeEditorColor";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";
import ThemePaletteWrapper from "@/components/app/themes/editor/editor-panel/ThemePaletteWrapper";

const ThemePalette = memo(() => {
  const palette = useAppSelector(selectThemePalette);

  return (
    <ThemePaletteWrapper>
      {(Object.entries(palette) as Array<[ThemeColorId, string]>).map(
        ([key, value], index, arr) => {
          const n = arr.length;

          // Mobile (1 column): show bottom border if not last item
          const mobileBottom = index < n - 1;

          const cols = 2;
          const rows = Math.ceil(n / cols);
          const rowIndex = Math.floor(index / cols);

          const mdBottom = rowIndex < rows - 1;

          /**
           * show right border in md if item is in the left column
           * AND there is a right neighbor (index + 1 < n)
           */
          const mdRight = !(index % cols);

          return (
            <ThemeEditorColor
              key={key}
              id={key}
              color={value}
              className={cn({
                "border-border": mobileBottom || mdBottom || mdRight,
                "border-b-2": mobileBottom,
                "md:border-b-2": mdBottom,
                "md:border-r-2": mdRight,
              })}
            />
          );
        },
      )}
    </ThemePaletteWrapper>
  );
});

export default ThemePalette;
