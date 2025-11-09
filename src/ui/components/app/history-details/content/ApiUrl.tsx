import { memo } from "react";
import {
  ApiMethodSelect,
  ApiMethodSelectTrigger,
} from "@/components/ui/api-method-select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";

const ApiUrl = memo(() => {
  const { url, method } = useAppSelector(selectHistoryDetails);
  const { handleToggleReplaceAlert } = useHistoryDetails();

  return (
    <form
      className={cn(
        "w-full flex p-2 rounded-md bg-accent/50 hover:bg-accent/60 focus-within:bg-accent/70 gap-1.5 border"
      )}
    >
      <div
        className="shrink-0 select-none"
        style={{
          width: "80px",
        }}
      >
        <ApiMethodSelect disabled>
          <ApiMethodSelectTrigger
            methodType={method ?? "get"}
            className="w-full h-full py-0 justify-center"
            size="sm"
            showIcon={false}
          />
        </ApiMethodSelect>
      </div>
      <div className={cn("w-full border-b border-input/80")}>
        <input
          placeholder="Enter URL or paste text"
          className="text-sm w-full h-full placeholder:text-muted-foreground px-3 bg-transparent rounded-none border-0 tracking-wide"
          value={url}
        />
      </div>
      <Button
        type="button"
        className="rounded-l-none uppercase"
        size={"sm"}
        onClick={() => handleToggleReplaceAlert(true)}
      >
        Send
      </Button>
    </form>
  );
});

export default ApiUrl;
