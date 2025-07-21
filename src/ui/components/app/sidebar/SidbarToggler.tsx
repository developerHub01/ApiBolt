import { memo, useCallback } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";

const SidbarToggler = memo(() => {
  const dispath = useAppDispatch();
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);

  const handleClick = useCallback(
    () => dispath(handleToggleRequestList()),
    [dispath]
  );

  if (activeTab !== "collections") return null;

  return (
    <AnimatePresence>
      {activeTab === "collections" && (
        <motion.span key="toggle-collection-list" exit={{ opacity: 0 }}>
          <Button size={"icon"} variant={"ghost"} onClick={handleClick}>
            <MenuIcon />
          </Button>
        </motion.span>
      )}
    </AnimatePresence>
  );
});

SidbarToggler.displayName = "Sidebar toggler";

export default SidbarToggler;
