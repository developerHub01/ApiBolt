import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";
import ThemeEditorColor from "@/components/app/themes/editor/ThemeEditorColor";
import type { ThemeColorId } from "@/types/theme.types";
import ThemeEditorWrapper from "@/components/app/themes/editor/ThemeEditorWrapper";
import ThemeEditorPanelTop from "@/components/app/themes/editor/editor-panel/ThemeEditorPanelTop";

const ThemeEditorPanel = () => {
  const palette = useAppSelector(selectThemePalette);

  return (
    <section className="flex-1 min-h-0 bg-secondary p-4 rounded-lg shadow-2xl flex flex-col gap-3">
      <ThemeEditorPanelTop />
      <ThemeEditorWrapper>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {(Object.entries(palette) as Array<[ThemeColorId, string]>).map(
            ([key, value]) => (
              <ThemeEditorColor key={key} id={key} color={value} />
            )
          )}
        </div>
      </ThemeEditorWrapper>
    </section>
  );
};

export default ThemeEditorPanel;
