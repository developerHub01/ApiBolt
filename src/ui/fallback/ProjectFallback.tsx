import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectFallback = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col p-4 justify-center items-center relative">
      <section className="w-full h-full max-w-3xl flex justify-center items-center">
        <div className="w-full h-full flex flex-col gap-4 p-5 pb-8 justify-center">
          <Skeleton className="w-full h-25" />
          <Skeleton className="w-full h-32" />
          <ButtonLikeDiv variant={"transparent"} className="px-0 py-0 shrink-0">
            <Skeleton className="flex-1 h-full" />
            <Skeleton className="w-12 h-full" />
          </ButtonLikeDiv>
          <ScrollArea className="w-full h-full flex-1 min-h-0 overflow-x-hidden [&>div>div]:h-full">
            <div className="h-full flex flex-col gap-3 p-0.5">
              {Array.from({ length: 10 }, (_, index) => (
                <Skeleton className="h-17" key={index} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>
    </section>
  );
};

export default ProjectFallback;
