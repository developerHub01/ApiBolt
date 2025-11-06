import { memo } from "react";
import { AnimatedDialogTop } from "@/components/ui/animated-dialog";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { Badge } from "@/components/ui/badge";

const HistoryTop = memo(() => {
  const { meta } = useHistoryDetails();

  return (
    <AnimatedDialogTop>
      <div className="p-2 text-lg flex items-center gap-3">
        <p className="font-semibold">History</p>
        {Boolean(meta?.createdAt) && (
          <Badge
            variant={"secondary"}
            className="border-dashed border-accent-foreground/50"
          >
            {meta?.createdAt}
          </Badge>
        )}
      </div>
    </AnimatedDialogTop>
  );
});

export default HistoryTop;
