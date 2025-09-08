import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  useSetting,
  type TSettingTab,
} from "@/context/setting/SettingProvider";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { AnimatedDialogTop } from "@/components/ui/animated-dialog";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/request-response/request-response-selector";

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
  const activeProjectId = useAppSelector(selectActiveProjectId);

  return (
    <AnimatedDialogTop>
      <div
        className={cn("w-full grid gap-2 relative rounded-xl", {
          "grid-cols-2": activeProjectId,
        })}
      >
        {buttonList.map(({ id, label }, index) => {
          /* if activeProjectId not exist and index more then 0 then dont render */
          if (!activeProjectId && index) return null;
          return (
            <Button
              key={id}
              variant={"secondary"}
              className="w-full relative z-0 bg-transparent hover:bg-transparent"
              onClick={() => handleChangeActiveTab(id)}
            >
              {label}
            </Button>
          );
        })}
        <div
          className={cn(
            "w-full h-full grid gap-2 absolute top-0 left-0 rounded-xl pointer-events-none z-[1]",
            {
              "grid-cols-2": activeProjectId,
            }
          )}
        >
          <motion.div
            id="tab-indicator"
            layout
            className={cn("w-[90%] mx-auto border-b-2 border-primary", {
              "col-start-1": !activeProjectId || activeTab === "global",
              "col-start-2": activeProjectId && activeTab === "project",
            })}
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
