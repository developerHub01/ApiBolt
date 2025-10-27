import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCw as RefreshIcon, type LucideIcon } from "lucide-react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadSettings } from "@/context/redux/setting/thunk/setting-thunk";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  label?: string;
  className?: string;
  Icon?: LucideIcon;
  side?: "bottom" | "top" | "right" | "left";
  align?: "end" | "center" | "start";
  show?: boolean;
}

const SettingRefresh = memo(
  ({
    label,
    className = "",
    Icon = RefreshIcon,
    side = "bottom",
    align = "end",
    show,
  }: Props) => {
    const dispatch = useAppDispatch();
    const handleRefresh = () => dispatch(loadSettings());

    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"iconSm"}
                  variant="secondary"
                  onClick={handleRefresh}
                  className={className}
                >
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={side} align={align}>
                <p>{label ? label : "Refresh Settings"}</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default SettingRefresh;
