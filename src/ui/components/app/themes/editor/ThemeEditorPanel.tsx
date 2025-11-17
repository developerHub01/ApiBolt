import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";
import ThemeEditorColor from "@/components/app/themes/editor/ThemeEditorColor";
import type { ThemeColorId } from "@/types/theme.types";
import ThemeEditorWrapper from "@/components/app/themes/editor/ThemeEditorWrapper";

const ThemeEditorPanel = () => {
  const palette = useAppSelector(selectThemePalette);

  return (
    <ThemeEditorWrapper>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {(Object.entries(palette) as Array<[ThemeColorId, string]>).map(
          ([key, value]) => (
            <ThemeEditorColor key={key} id={key} color={value} />
          )
        )}
      </div>
    </ThemeEditorWrapper>
  );
};

export default ThemeEditorPanel;
