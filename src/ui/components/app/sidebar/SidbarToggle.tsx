import { memo, useCallback } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";

const SidbarToggle = memo(() => {
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
          <Button size={"icon"} variant={"outline"} onClick={handleClick}>
            <MenuIcon />
          </Button>
        </motion.span>
      )}
    </AnimatePresence>
  );
});

SidbarToggle.displayName = "Sidebar toggle";

export default SidbarToggle;
