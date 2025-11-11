import { memo, useCallback } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { selectSidebarActiveTab } from "@/context/redux/sidebar/selectors/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

const SidbarToggle = memo(() => {
  const dispath = useAppDispatch();
  const activeTab = useAppSelector(selectSidebarActiveTab);
  const shortcut = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "toggle_sidebar")
  );

  const shortCutString =
    Array.isArray(shortcut) && shortcut.length
      ? ` (${keyListStringify(shortcut)})`
      : "";

  const handleCollapse = useCallback(
    () => dispath(handleToggleRequestList()),
    [dispath]
  );

  return (
    <AnimatePresence>
      {activeTab === "navigate_collections" && (
        <motion.span
          key="toggle-collection-list"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"icon"}
                variant={"background"}
                onClick={handleCollapse}
              >
                <MenuIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" variant={"secondary"}>
              <p>Toggle Sidebar{shortCutString}</p>
            </TooltipContent>
          </Tooltip>
        </motion.span>
      )}
    </AnimatePresence>
  );
});

SidbarToggle.displayName = "Sidebar toggle";

export default SidbarToggle;
