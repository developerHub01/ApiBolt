import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";
import { Plus as AddIcon } from "lucide-react";
import { motion } from "motion/react";
import { addNewTab } from "@/context/redux/request-response/request-response-thunk";

export const AddNewTab = () => {
  const dispatch = useAppDispatch();
  const isTabListHovering = useAppSelector(
    (state) => state.requestResponse.isTabListHovering
  );

  const handleAdd = useCallback(() => {
    dispatch(addNewTab());
  }, [dispatch]);

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
