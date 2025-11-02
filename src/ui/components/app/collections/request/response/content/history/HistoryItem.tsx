import { memo, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash as DeleteIcon } from "lucide-react";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import { AnimatePresence, motion } from "motion/react";
import HttpStatus from "@/components/ui/http-status";

const HistoryItem = memo(() => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const method = useMemo(
    () => (Math.round(Math.random()) ? "get" : "patch"),
    []
  );

  return (
    <motion.div
      className="flex items-center justify-between gap-2 min-h-9 hover:bg-secondary/50 px-2 cursor-pointer"
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
        <p>Today, 7:23 PM</p>
        <HttpStatus status={200} statusText="OK" variant="secondary" />
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5, width: "0" }}
            animate={{ opacity: 1, scale: 1, width: "auto" }}
            exit={{ opacity: 0, scale: 0.5, width: "0" }}
            transition={{ duration: 0.2 }}
          >
            <Button variant={"destructive"} size={"iconXs"}>
              <DeleteIcon />
            </Button>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default HistoryItem;
