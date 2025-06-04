import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleAddTab } from "@/context/redux/tab-sidebar-slice/tab-sidebar-slice";
import { cn } from "@/lib/utils";
import { Plus as AddIcon } from "lucide-react";
import { motion } from "motion/react";

export const AddNewTab = () => {
  const dispatch = useAppDispatch();
  const isTabListHovering = useAppSelector(
    (state) => state.tabSidebar.isTabListHovering
  );

  const handleAdd = () => dispatch(handleAddTab());

  return (
    <div className="p-2 pt-0">
      <Button
        variant={"secondary"}
        size={"sm"}
        className={cn("w-full gap-0", {
          "justify-start": isTabListHovering,
          "justify-center": !isTabListHovering,
        })}
        onClick={handleAdd}
      >
        <AddIcon />
        <motion.span
          className="transition-all duration-300 text-left"
          style={{ transformOrigin: "left" }}
          animate={{
            opacity: isTabListHovering ? 1 : 0,
            width: isTabListHovering ? "100%" : "0px",
            paddingLeft: isTabListHovering ? "8px" : "0px",
            scaleX: isTabListHovering ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          Add Tab
        </motion.span>
      </Button>
    </div>
  );
};
