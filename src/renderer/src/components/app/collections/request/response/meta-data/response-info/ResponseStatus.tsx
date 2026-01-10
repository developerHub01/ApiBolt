import { memo } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HttpStatus from "@/components/ui/http-status";
import type { ResponseInterface } from "@shared/types/request-response.types";
import { Button } from "@/components/ui/button";

type Props = Pick<
  ResponseInterface,
  "status" | "statusText" | "statusDescription"
> &
  Partial<Pick<ResponseInterface, "status">>;

const ResponseStatus = memo(
  ({ status, statusText, statusDescription }: Props) => {
    if (!status) return null;

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant={"transparent"} className="px-0 py-0 h-auto">
            <HttpStatus status={status} statusText={statusText} />
          </Button>
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
  },
);

ResponseStatus.displayName = "Response status";

export default ResponseStatus;
