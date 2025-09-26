import { memo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";
import { motion } from "motion/react";
import { useSetting } from "@/context/setting/SettingProvider";
import SettingZoom from "@/components/app/setting/content/zoom/SettingZoom";
import SettingLayout from "@/components/app/setting/content/layout/SettingLayout";
import SettingCode from "@/components/app/setting/content/code/SettingCode";
import SettingBackground from "@/components/app/setting/content/background/SettingBackground";
import SettingHttpStatus from "@/components/app/setting/content/http-status/SettingHttpStatus";

const SettingContent = memo(() => {
  const { activeTab } = useSetting();

  return (
    <AnimatedDialogContent>
      <motion.section
        key={activeTab}
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: -10,
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          ease: "anticipate",
        }}
      >
        <Accordion type="multiple" className="w-full px-3">
          <SettingBackground />
          <SettingZoom />
          <SettingLayout />
          <SettingCode />
          <SettingHttpStatus />
        </Accordion>
      </motion.section>
    </AnimatedDialogContent>
  );
});

export default SettingContent;
