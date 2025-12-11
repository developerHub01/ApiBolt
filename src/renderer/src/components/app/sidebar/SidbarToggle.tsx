import { memo } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector } from "@/context/redux/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";
import useShowSidebarToggler from "@/hooks/sidebar/use-show-sidebar-toggler";
import useToggleSidebar from "@/hooks/sidebar/use-toggle-sidebar";
import SidebarActionButton from "@/components/app/sidebar/SidebarActionButton";

const SidbarToggle = memo(() => {
  const shortcut = useAppSelector(state =>
    selectApplyingKeyboardShortcutsById(state, "toggle_sidebar"),
  );
  const showToggle = useShowSidebarToggler();

  const shortCutString =
    Array.isArray(shortcut) && shortcut.length
      ? ` (${keyListStringify(shortcut)})`
      : "";

  const handleToggle = useToggleSidebar();

  return (
    <AnimatePresence>
      {showToggle && (
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
              <SidebarActionButton
                size={"icon"}
                onClick={handleToggle}
                Icon={MenuIcon}
              />
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
