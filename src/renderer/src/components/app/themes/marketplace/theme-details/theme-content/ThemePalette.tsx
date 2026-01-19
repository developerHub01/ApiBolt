import { useMemo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { cn } from "@/lib/utils";
import ThemeDetailsSectionWrapper from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeDetailsSectionWrapper";

const ThemePalette = () => {
  const themeDetails = useAppSelector(selectSelectedThemeDetails);
  const colorList = useMemo(
    () => Object.entries(themeDetails?.palette ?? {}),
    [themeDetails?.palette],
  );
  if (!themeDetails) return null;

  return (
    <ThemeDetailsSectionWrapper title="Palette:">
      <div className="flex flex-col border-2 border-dashed p-4 rounded-lg bg-background divide-y-2 divide-dashed">
        {colorList.map(([key, value], index) => (
          <div key={key} className="flex divide-x-2 divide-dashed">
            <div
              className={cn(
                "text-base capitalize flex-1 p-2 pl-0 flex items-center text-accent-foreground",
                {
                  "pt-0": !index,
                  "pb-0": index === colorList.length - 1,
                },
              )}
            >
              {key}
            </div>
            <div
              className={cn("flex-1 p-2 pr-0", {
                "pt-0": !index,
                "pb-0": index === colorList.length - 1,
              })}
            >
              <div
                className="w-full h-full rounded-md p-5 shadow-2xl ring-3 ring-accent/50"
                style={{
                  background: value,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ThemeDetailsSectionWrapper>
  );
};

export default ThemePalette;
