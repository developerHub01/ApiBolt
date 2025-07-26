import { memo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";
import SettingZoom from "@/components/app/setting/content/zoom/SettingZoom";
import BackgroundImage from "@/components/app/setting/content/BackgroundImage";
import SettingLayout from "@/components/app/setting/content/layout/SettingLayout";
import { motion } from "motion/react";
import { useSetting } from "@/context/setting/SettingProvider";

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
        <Accordion type="multiple" className="w-full">
          <BackgroundImage />
          <SettingZoom />
          <SettingLayout />
        </Accordion>
      </motion.section>
    </AnimatedDialogContent>
  );
});

export default SettingContent;
