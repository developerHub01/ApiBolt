import RequestListSkeleton from "@/components/app/collections/request-list/content/skeleton/RequestListSkeleton";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { ScrollAreaInnerFlexView } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const RequestListPanelFallback = () => {
  return (
    <div className="w-full flex flex-col h-full gap-1">
      <div className="flex justify-between px-2 py-1.5">
        <ButtonLikeDiv
          variant={"transparent"}
          size={"sm"}
          className="px-0 py-0 w-full max-w-24"
        >
          <Skeleton className="w-full h-full" />
        </ButtonLikeDiv>
        <ButtonLikeDiv
          variant={"transparent"}
          size={"iconSm"}
          className="px-0 py-0"
        >
          <Skeleton className="h-full aspect-square" />
        </ButtonLikeDiv>
      </div>
      <ScrollAreaInnerFlexView className="flex-1 w-full min-h-0 text-sm [&>div>div]:w-full [&>div>div]:h-full px-1">
        <RequestListSkeleton />
      </ScrollAreaInnerFlexView>
      <div className="flex items-center justify-end gap-1.5 px-2 py-1.5">
        {Array.from({ length: 6 }, (_, index) => (
          <ButtonLikeDiv
            key={index}
            size={"iconXs"}
            variant={"transparent"}
            className="px-0 py-0"
          >
            <Skeleton className="w-full h-full" />
          </ButtonLikeDiv>
        ))}
      </div>
    </div>
  );
};

export default RequestListPanelFallback;
