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
import { handleToggleThemeListCollapsed } from "@/context/redux/theme/theme-slice";
import { SIDEBAR_TOGGLE_BUTTON_ALLOWED_IDS } from "@/constant/sidebar.constant";

const SidbarToggle = memo(() => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectSidebarActiveTab);
  const shortcut = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "toggle_sidebar")
  );

  const shortCutString =
    Array.isArray(shortcut) && shortcut.length
      ? ` (${keyListStringify(shortcut)})`
      : "";

  const handleCollapse = useCallback(() => {
    switch (activeTab) {
      case "navigate_collections":
        dispatch(handleToggleRequestList());
        return;
      case "navigate_themes":
        dispatch(handleToggleThemeListCollapsed());
        return;
    }
  }, [activeTab, dispatch]);

  return (
    <AnimatePresence>
      {SIDEBAR_TOGGLE_BUTTON_ALLOWED_IDS.has(activeTab) && (
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
