import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  useSetting,
  type TSettingTab,
} from "@/context/setting/SettingProvider";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { AnimatedDialogTop } from "@/components/ui/animated-dialog";

const buttonList: Array<{
  id: TSettingTab;
  label: string;
}> = [
  {
    id: "global",
    label: "Global Setting",
  },
  {
    id: "project",
    label: "Project Setting",
  },
];

const SettingTop = memo(() => {
  const { activeTab, handleChangeActiveTab } = useSetting();

  return (
    <AnimatedDialogTop>
      <div className="w-full grid grid-cols-2 gap-2 relative rounded-xl">
        {buttonList.map(({ id, label }) => (
          <Button
            key={id}
            variant={"secondary"}
            className="w-full relative z-0 bg-transparent hover:bg-transparent"
            onClick={() => handleChangeActiveTab(id)}
          >
            {label}
          </Button>
        ))}
        <div className="w-full h-full grid grid-cols-2 gap-2 absolute top-0 left-0 rounded-xl pointer-events-none z-[1]">
          <motion.div
            id="tab-indicator"
            layout
            className={cn(
              "w-[90%] mx-auto col-start-2 border-b-2 border-primary",
              {
                "col-start-1": activeTab === "global",
                "col-start-2": activeTab === "project",
              }
            )}
            transition={{
              type: "spring",
              duration: 0.3,
              ease: "anticipate",
            }}
          ></motion.div>
        </div>
      </div>
    </AnimatedDialogTop>
  );
});

export default SettingTop;
