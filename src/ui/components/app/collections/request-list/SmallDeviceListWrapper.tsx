import { memo } from "react";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";
import type { TLayoutSetting } from "@/types/setting.types";

interface SmallDeviceListWrapperProps {
  handleCollapse: () => void;
  isCollapsed: boolean;
}

const SmallDeviceListWrapper = memo(
  ({ isCollapsed, handleCollapse }: SmallDeviceListWrapperProps) => {
    const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();

    return (
      <AnimatedDialog
        isOpen={!isCollapsed}
        onClose={handleCollapse}
        className={cn("p-0 justify-start", {
          "justify-start": layoutTypes === "ltr",
          "justify-end": layoutTypes === "rtl",
        })}
      >
        <motion.div
          className={cn("w-full backdrop-blur-lg h-full border-r-2", {
            "border-r-2": layoutTypes === "ltr",
            "border-l-2": layoutTypes === "rtl",
          })}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "60vw",
          }}
          initial={{
            opacity: 0,
            x: layoutTypes === "ltr" ? -100 : 100,
            transition: {
              delay: 0.2,
            },
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: layoutTypes === "ltr" ? -100 : 100,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            ease: "anticipate",
          }}
        >
          <RequestListPanel />
        </motion.div>
      </AnimatedDialog>
    );
  }
);

export default SmallDeviceListWrapper;
