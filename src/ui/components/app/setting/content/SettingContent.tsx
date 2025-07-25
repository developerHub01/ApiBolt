import { memo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";
import SettingZoom from "@/components/app/setting/content/zoom/SettingZoom";
import BackgroundImage from "@/components/app/setting/content/BackgroundImage";

const SettingContent = memo(() => {
  return (
    <AnimatedDialogContent>
      <Accordion type="multiple" className="w-full">
        <BackgroundImage />
        <SettingZoom />
      </Accordion>
    </AnimatedDialogContent>
  );
});

export default SettingContent;
