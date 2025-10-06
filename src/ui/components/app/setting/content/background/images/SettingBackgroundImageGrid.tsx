import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import SettingBackgroundImage from "@/components/app/setting/content/background/images/SettingBackgroundImage";

interface Props {
  backgroundList: Array<string>;
  selectedIndex: number | null;
  maxNumberOfImages: number;
  onClick: (index: number) => void;
}

const SettingBackgroundImageGrid = memo(
  ({ backgroundList, selectedIndex, maxNumberOfImages, onClick }: Props) => {
    return (
      <ScrollArea
        className={cn(
          "h-90 [&>div>div]:h-full transition-all duration-300 ease-in-out",
          {
            "col-span-full": selectedIndex === null,
            "col-span-1": selectedIndex !== null,
          }
        )}
      >
        <div
          className={cn(
            "w-full h-full grid grid-cols-3 gap-2 justify-center items-center",
            {
              "grid-cols-2 md:grid-cols-3": selectedIndex !== null,
              "grid-cols-3 md:grid-cols-4": selectedIndex == null,
            }
          )}
        >
          {backgroundList.map((img, index) => (
            <SettingBackgroundImage
              src={img}
              key={img}
              index={index}
              disabled={index >= maxNumberOfImages}
              onClick={() => onClick(index)}
              isActive={index === selectedIndex}
            />
          ))}
        </div>
      </ScrollArea>
    );
  }
);

export default SettingBackgroundImageGrid;
