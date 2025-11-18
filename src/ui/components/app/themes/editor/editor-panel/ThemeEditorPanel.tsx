import { useAppSelector } from "@/context/redux/hooks";
import ThemeEditorWrapper from "@/components/app/themes/editor/ThemeEditorWrapper";
import ThemeEditorPanelTop from "@/components/app/themes/editor/editor-panel/theme-palette-top/ThemeEditorPanelTop";
import { selectThemeEditingPaletteLoading } from "@/context/redux/status/selectors/theme";
import SkeletonLoader from "@/components/app/themes/editor/editor-panel/SkeletonLoader";
import ThemePalette from "@/components/app/themes/editor/editor-panel/ThemePalette";
import { AnimatePresence } from "motion/react";

const ThemeEditorPanel = () => {
  const isLoading = useAppSelector(selectThemeEditingPaletteLoading);

  return (
    <section className="flex-1 min-h-0 bg-secondary p-4 rounded-lg shadow-2xl flex flex-col gap-3">
      <ThemeEditorPanelTop />
      <ThemeEditorWrapper>
        <AnimatePresence>
          {isLoading ? <SkeletonLoader /> : <ThemePalette />}
        </AnimatePresence>
      </ThemeEditorWrapper>
    </section>
  );
};

export default ThemeEditorPanel;
