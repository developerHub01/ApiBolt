import { memo, useCallback, type MouseEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import SettingBackgroundImage from "@/components/app/setting/content/background/images/SettingBackgroundImage";
import { useSettingBackground } from "@/context/setting/background/SettingBackgroundProvider";

interface Props {
  backgroundList: Array<string>;
  className?: string;
  selectedIndex: number | null;
  maxNumberOfImages: number;
}

const SettingBackgroundImageGrid = memo(
  ({
    backgroundList,
    selectedIndex,
    maxNumberOfImages,
    className = "",
  }: Props) => {
    const { handleChangeSelectedBackgroundImageIndex } = useSettingBackground();

    const handleClickGrid = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const childDiv = target.closest("[data-id]") as HTMLElement | null;

        if (!childDiv || isNaN(Number(childDiv?.dataset?.id))) return;

        handleChangeSelectedBackgroundImageIndex(Number(childDiv.dataset.id));
      },
      [handleChangeSelectedBackgroundImageIndex],
    );

    return (
      <ScrollArea
        className={cn(
          "h-90 [&>div>div]:h-full transition-all duration-300 ease-in-out",
          {
            "col-span-full": selectedIndex === null,
            "col-span-1": selectedIndex !== null,
          },
          className,
        )}
      >
        <div
          className={cn(
            "w-full grid grid-cols-3 gap-2 justify-center items-center",
            {
              "grid-cols-2 md:grid-cols-3": selectedIndex !== null,
              "grid-cols-3 md:grid-cols-4": selectedIndex == null,
            },
          )}
          onClick={handleClickGrid}
        >
          {backgroundList.map((img, index) => (
            <SettingBackgroundImage
              src={img}
              key={img}
              index={index}
              disabled={index >= maxNumberOfImages}
              isActive={index === selectedIndex}
            />
          ))}
        </div>
      </ScrollArea>
    );
  },
);

export default SettingBackgroundImageGrid;
