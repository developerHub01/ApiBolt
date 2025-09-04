import { memo } from "react";
import { AnimatedDialogBottom } from "@/components/ui/animated-dialog";

const SettingBottom = memo(() => {
  return (
    <AnimatedDialogBottom>
      <p className="line-clamp-1 text-center max-w-lg text-sm">
        Customize your settings to make ApiBolt yours.
      </p>
    </AnimatedDialogBottom>
  );
});

export default SettingBottom;
