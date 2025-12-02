import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useIsSmallDevice from "@/hooks/use-is-small-device";
import { useParams } from "react-router-dom";

const ThemeMarketplaceFallback = () => {
  const { id } = useParams<{ id?: string }>();
  const isSmallDevice = useIsSmallDevice(1100);

  return (
    <section className="w-full h-full overflow-hidden flex justify-center items-center relative">
      {!isSmallDevice && (
        <div className="flex flex-col h-full gap-1 w-md shrink-0 grow-0">
          <div className="p-2 pb-0 w-full">
            <ButtonLikeDiv variant={"transparent"} className="w-full px-0 py-0">
              <Skeleton className="flex-1 h-full" />
              <Skeleton className="w-11 h-full" />
              <Skeleton className="w-11 h-full" />
            </ButtonLikeDiv>
          </div>
          <ScrollArea className="flex-1 w-full min-h-0 text-sm [&>div>div]:w-full [&>div>div]:h-full p-2 pt-0">
            <div className="flex flex-col gap-2">
              {Array.from({ length: 20 }, (_, index) => (
                <Skeleton key={index} className="w-full h-24 shrink-0" />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      <section className="flex-1 h-full">
        {id ? (
          <section className="w-full h-full max-w-3xl flex flex-col p-5 mx-auto gap-4">
            <Skeleton className="w-full h-40" />
            <Separator
              className="bg-border data-[orientation=horizontal]:h-1"
              orientation="horizontal"
            />
            <Skeleton className="w-full flex-1" />
          </section>
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center p-3">
            <Skeleton className="w-full h-full md:max-w-xl md:max-h-[450px]" />
          </div>
        )}
      </section>
    </section>
  );
};

export default ThemeMarketplaceFallback;
