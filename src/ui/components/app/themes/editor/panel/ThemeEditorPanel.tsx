import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";
import ThemeEditorColor from "@/components/app/themes/editor/panel/ThemeEditorColor";
import type { ThemeColorId } from "@/types/theme.types";

const ThemeEditorPanel = () => {
  const palette = useAppSelector(selectThemePalette);

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full max-w-75">
      <div className="w-full h-full flex flex-col gap-2.5">
        {(Object.entries(palette) as Array<[ThemeColorId, string]>).map(
          ([key, value]) => (
            <ThemeEditorColor key={key} id={key} color={value} />
          )
        )}
      </div>
    </ScrollArea>
  );
};

export default ThemeEditorPanel;
