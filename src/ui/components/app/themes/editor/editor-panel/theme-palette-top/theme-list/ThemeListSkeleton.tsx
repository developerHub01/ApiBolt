import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

const ThemeListSkeleton = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      className="grid grid-cols-2 gap-5"
    >
      {Array.from({ length: 10 }, (_, index) => (
        <Skeleton key={index} className="rounded-xl aspect-square" />
      ))}
    </motion.section>
  );
};

export default ThemeListSkeleton;
