import { memo } from "react";
import { TestResultInterface } from "@shared/types/test-script.types";
import TestStatus from "@/components/app/collections/request/response/content/test-result/TestStatus";
import { motion } from "motion/react";

interface Props extends TestResultInterface {}

const TestResultItem = memo(({ success, name, message }: Props) => {
  return (
    <motion.div
      className="flex items-center justify-between gap-3 min-h-9 hover:bg-secondary/50 transition-colors py-2.5 cursor-pointer"
      initial={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
      whileHover={{
        paddingLeft: 8,
        paddingRight: 8,
      }}
      transition={{
        layout: { duration: 0.3, ease: "easeInOut" },
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <TestStatus success={success} />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-5">{message}</p>
      </div>
    </motion.div>
  );
});

export default TestResultItem;
