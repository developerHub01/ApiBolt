import { memo } from "react";
import { AnimatedDialogBottom } from "@/components/ui/animated-dialog";

const SettingBottom = memo(() => {
  return (
    <AnimatedDialogBottom>
      <p className="line-clamp-1 text-center max-w-lg text-sm">
        Customize your setting to personalize the UI
      </p>
    </AnimatedDialogBottom>
  );
});

export default SettingBottom;
