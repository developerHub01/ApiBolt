import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectResponse } from "@/context/redux/request-response/selectors/response";
import { useAppSelector } from "@/context/redux/hooks";
import ErrorBlock from "@/components/app/collections/request/response/content/ErrorBlock";

const ResponseError = memo(() => {
  const response = useAppSelector(selectResponse)!;
  const { statusText, statusDescription } = response;

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
      <ErrorBlock message={statusText} description={statusDescription} />
    </ScrollArea>
  );
});

export default ResponseError;
