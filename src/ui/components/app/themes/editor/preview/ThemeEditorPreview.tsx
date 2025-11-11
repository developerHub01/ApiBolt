import { useMemo, type CSSProperties } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemePalette } from "@/context/redux/theme/selectors/theme";

const ThemeEditorPreview = () => {
  const palette = useAppSelector(selectThemePalette);

  const styleVars = useMemo(
    () =>
      Object.entries(palette).reduce(
        (acc, [key, value]) => ({ ...acc, [`--${key}`]: value }),
        {}
      ),
    [palette]
  );

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
      <div
        className="w-full h-full flex flex-col gap-2.5"
        style={styleVars as CSSProperties}
      >
        <h1 className="text-lg p-2 text-green-500 bg-background">background</h1>
        <h1 className="text-lg p-2 text-green-500 bg-foreground">foreground</h1>
        <h1 className="text-lg p-2 text-green-500 bg-card">card</h1>
        <h1 className="text-lg p-2 text-green-500 bg-card-foreground">
          card-foreground
        </h1>
        <h1 className="text-lg p-2 text-green-500 bg-popover">popover</h1>
        <h1 className="text-lg p-2 text-green-500 bg-popover-foreground">
          popover-foreground
        </h1>
        <h1 className="text-lg p-2 text-green-500 bg-primary">primary</h1>
        <h1 className="text-lg p-2 text-green-500 bg-primary-foreground">
          primary-foreground
        </h1>
        <h1 className="text-lg p-2 text-green-500 bg-secondary">secondary</h1>
        <h1 className="text-lg p-2 text-green-500 bg-muted">muted</h1>
        <h1 className="text-lg p-2 text-green-500 bg-muted-foreground">
          muted-foreground
        </h1>
        <h1 className="text-lg p-2 text-green-500 bg-accent">accent</h1>
        <h1 className="text-lg p-2 text-green-500 bg-accent-foreground">
          accent-foreground
        </h1>
        <h1 className="text-lg p-2 text-green-500 bg-destructive">
          destructive
        </h1>
        <h1 className="text-lg p-2 text-green-500 bg-border">border</h1>
        <h1 className="text-lg p-2 text-green-500 bg-ring">ring</h1>
      </div>
    </ScrollArea>
  );
};

export default ThemeEditorPreview;
