import { memo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";
import HttpStatus from "@/components/ui/http-status";

const ResponseStatus = memo(() => {
  const response = useAppSelector(selectResponse);
  if (!response || !response) return null;

  const { status, statusText, statusDescription } = response;
  if (!status) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <HttpStatus status={status} statusText={statusText} />
      </HoverCardTrigger>
      <HoverCardContent
        className="w-60 flex flex-col gap-1.5 bg-background p-2.5"
        side="bottom"
        align="end"
      >
        <h4 className="text-base font-semibold">
          {status} {statusText}
        </h4>
        <p className="text-sm text-muted-foreground">{statusDescription}</p>
      </HoverCardContent>
    </HoverCard>
  );
});

ResponseStatus.displayName = "Response status";

export default ResponseStatus;
