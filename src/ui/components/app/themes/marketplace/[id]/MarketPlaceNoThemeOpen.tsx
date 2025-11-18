import Empty from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";

const MarketPlaceNoThemeOpen = () => {
  return (
    <ScrollArea className="w-full flex-1 min-h-0 h-full [&>div>div]:h-full p-5">
      <div className="flex flex-col w-full h-full items-center justify-center p-3">
        <Empty
          label="Explore Theme Collection"
          description="Click any theme on the left to discover its color palette, full file previews, and apply it to your current session."
          animationSrc="./lottie/no-data-found.lottie"
          showFallback
          className="w-full h-full md:max-w-xl md:max-h-[450px]"
        />
      </div>
    </ScrollArea>
  );
};

export default MarketPlaceNoThemeOpen;
