import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const ParamsSkeleton = () => {
  return (
    <>
      <div className="w-full flex gap-3">
        <Skeleton className="w-22 grow-0" />
        <ButtonLikeDiv
          variant={"transparent"}
          size={"xs"}
          className="ml-auto grow-0 shrink-0 w-17 px-0"
        >
          <Skeleton className="w-full h-full" />
        </ButtonLikeDiv>
      </div>
      <ScrollArea className="flex-1 overflow-hidden w-full min-h-0 h-full [&>div>div]:h-full border-t rounded-lg">
        <div className="w-full h-full flex flex-col gap-4 items-center pb-5">
          <section className="w-full rounded-lg overflow-hidden flex flex-col flex-1 gap-1">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="flex gap-1">
                <Skeleton className="w-11 h-11 grow-0" />
                <Skeleton className="h-11 flex-1" />
                <Skeleton className="h-11 flex-1" />
              </div>
            ))}
          </section>
          <ButtonLikeDiv
            variant={"transparent"}
            size={"sm"}
            className="w-full max-w-60 mx-auto px-0"
          >
            <Skeleton className="w-full h-full" />
          </ButtonLikeDiv>
        </div>
      </ScrollArea>
    </>
  );
};

export default ParamsSkeleton;
