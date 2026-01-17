import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeCardSkeleton from "@/components/app/themes/marketplace/theme-list/ThemeCardSkeleton";

const ThemeMarketplaceFallback = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col justify-center items-center relative">
      <section className="w-full min-h-0 max-w-3xl flex-1 flex flex-col p-5 mx-auto gap-4">
        <Skeleton className="w-full h-12" />
        <ScrollArea className="flex-1 w-full min-h-0">
          <section className="grid grid-cols-2 gap-3 p-1">
            {Array.from({ length: 6 }, (_, key) => (
              <ThemeCardSkeleton key={key} />
            ))}
          </section>
        </ScrollArea>
        <Skeleton className="w-full h-10" />
      </section>
    </section>
  );
};

export default ThemeMarketplaceFallback;
