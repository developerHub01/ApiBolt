import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";
import ThemeEditorColor from "@/components/app/themes/editor/ThemeEditorColor";
import type { ThemeColorId } from "@/types/theme.types";
import ThemeEditorWrapper from "@/components/app/themes/editor/ThemeEditorWrapper";
import ThemeEditorPanelTop from "@/components/app/themes/editor/editor-panel/ThemeEditorPanelTop";
import { cn } from "@/lib/utils";

const ThemeEditorPanel = () => {
  const palette = useAppSelector(selectThemePalette);

  return (
    <section className="flex-1 min-h-0 bg-secondary p-4 rounded-lg shadow-2xl flex flex-col gap-3">
      <ThemeEditorPanelTop />
      <ThemeEditorWrapper>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
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
                    "border-border":
                      mobileBottom || mdBottom || mdRight,
                    "border-b-2": mobileBottom,
                    "md:border-b-2": mdBottom,
                    "md:border-r-2": mdRight,
                  })}
                />
              );
            }
          )}
        </div>
      </ThemeEditorWrapper>
    </section>
  );
};

export default ThemeEditorPanel;
