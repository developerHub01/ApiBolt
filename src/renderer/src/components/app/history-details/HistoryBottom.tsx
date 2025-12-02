import { memo } from "react";
import { AnimatedDialogBottom } from "@/components/ui/animated-dialog";

const HistoryBottom = memo(() => {
  return (
    <AnimatedDialogBottom>
      <p className="line-clamp-1 text-center max-w-lg text-sm">
        This is the history request details, and readonly.
      </p>
    </AnimatedDialogBottom>
  );
});

export default HistoryBottom;
