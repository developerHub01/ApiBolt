import RequestResizableWrapper from "@/components/app/collections/request/RequestResizableWrapper";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { Skeleton } from "@/components/ui/skeleton";

const RequestFallback = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full p-3 flex flex-col gap-2">
        <div className="w-full flex gap-1">
          <Skeleton className="w-full max-w-14" />
          <Skeleton className="w-full max-w-56" />
          <ButtonLikeDiv
            variant={"transparent"}
            size={"icon"}
            className="px-0 py-0 ml-auto"
          >
            <Skeleton className="w-full h-full" />
          </ButtonLikeDiv>
        </div>
        <Skeleton className="w-full h-13" />
        <Skeleton className="w-full h-8" />
      </div>
      <RequestResizableWrapper>
        <div className="w-full flex-1 p-3 pt-1">
          <Skeleton className="size-full" />
        </div>
        <Skeleton className="w-full h-10 rounded-none" />
      </RequestResizableWrapper>
    </div>
  );
};

export default RequestFallback;
