import { memo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";
import { motion } from "motion/react";
import { useSetting } from "@/context/setting/SettingProvider";
import GlobalSettings from "@/components/app/setting/content/GlobalSettings";
import LocalSettings from "@/components/app/setting/content/LocalSettings";

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
          {activeTab === "global" ? <GlobalSettings /> : <LocalSettings />}
        </Accordion>
      </motion.section>
    </AnimatedDialogContent>
  );
});

export default SettingContent;
