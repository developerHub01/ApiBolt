import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash as DeleteIcon } from "lucide-react";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import { AnimatePresence, motion } from "motion/react";
import HttpStatus from "@/components/ui/http-status";
import type { HistoryItemMetaInterface } from "@/types/history.types";
import { useAppDispatch } from "@/context/redux/hooks";
import { deleteRequestHistoryById } from "@/context/redux/history/thunks/history";
import { toast } from "sonner";

const HistoryItem = memo(
  ({ id, method, createdAt, responseStatus }: HistoryItemMetaInterface) => {
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const statusCode = Number(responseStatus?.split(" ")?.[0]);
    const statusText = responseStatus?.split(" ")?.slice(1)?.join(" ") ?? "";

    const handleDelete = async () => {
      const response = await dispatch(deleteRequestHistoryById(id)).unwrap();
      if (response) toast.success("History Deleted successfully!");
    };

    return (
      <motion.div
        className="flex items-center justify-between gap-2 min-h-9 hover:bg-secondary/50 transition-colors px-2 cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      >
        <RequestMethodTag
          method={method}
          shortCut={false}
          className="w-14 px-0.5"
        />
        <motion.div
          layout
          className="ml-auto text-xs text-muted-foreground flex items-center gap-2"
          transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
        >
          {/* <p>Today, 7:23 PM</p> */}
          <p>{createdAt}</p>
          <HttpStatus
            status={statusCode}
            statusText={statusText}
            variant="secondary"
          />
        </motion.div>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5, width: "0" }}
              animate={{ opacity: 1, scale: 1, width: "auto" }}
              exit={{ opacity: 0, scale: 0.5, width: "0" }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant={"destructive"}
                size={"iconXs"}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Button>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

export default HistoryItem;
