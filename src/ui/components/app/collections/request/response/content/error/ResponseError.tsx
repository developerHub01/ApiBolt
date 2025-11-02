import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleAlert as AlertIcon, Bomb as ErrorIcon } from "lucide-react";
import { selectResponse } from "@/context/redux/request-response/selectors/response";
import { useAppSelector } from "@/context/redux/hooks";
import BorderedWrapper from "@/components/ui/bordered-wrapper";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

const ResponseError = memo(() => {
  const response = useAppSelector(selectResponse)!;
  const { statusText, statusDescription } = response;

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
      <BorderedWrapper className="flex flex-col gap-2 justify-center items-center p-4 text-center h-full">
        <div className="size-10 rounded-md bg-secondary grid place-items-center mb-1.5">
          <ErrorIcon />
        </div>
        <p className="text-sm font-medium">{statusText}</p>
        <ButtonLikeDiv variant={"destructiveSecondary"} className="h-auto">
          <AlertIcon size={14} />
          <p className="text-xs font-normal">{statusDescription}</p>
        </ButtonLikeDiv>
      </BorderedWrapper>
    </ScrollArea>
  );
});

export default ResponseError;
