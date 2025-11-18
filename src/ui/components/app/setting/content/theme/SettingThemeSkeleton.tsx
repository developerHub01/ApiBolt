import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

const SettingThemeSkeleton = () => {
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
      className="w-full h-full grid grid-cols-2 md:grid-cols-3 gap-5"
    >
      {Array.from({ length: 10 }, (_, index) => (
        <Skeleton key={index} className="rounded-xl aspect-square" />
      ))}
    </motion.section>
  );
};

export default SettingThemeSkeleton;
