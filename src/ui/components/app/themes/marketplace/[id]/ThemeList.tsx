import { memo } from "react";
import { ScrollAreaInnerFlexView } from "@/components/ui/scroll-area";
import ThemeCard from "@/components/app/themes/marketplace/[id]/ThemeCard";

const ThemeList = memo(() => {
  return (
    <ScrollAreaInnerFlexView className="flex-1 w-full min-h-0 text-sm [&>div>div]:w-full [&>div>div]:h-full">
      {Array.from({ length: 20 }, (_, index) => (
        <ThemeCard id={String(index)} />
      ))}
      <div className="h-full flex flex-col w-full gap-0.5 p-0">
        <div className="h-8" />
      </div>
    </ScrollAreaInnerFlexView>
  );
});

export default ThemeList;
