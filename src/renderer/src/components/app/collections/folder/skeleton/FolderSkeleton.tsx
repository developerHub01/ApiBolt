import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

const FolderSkeleton = () => {
  return (
    <motion.section
      className="w-full h-full p-3"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "linear",
      }}
    >
      <div className="flex flex-col gap-4 w-full h-full max-w-5xl mx-auto">
        <Skeleton className="w-full h-11.25" />
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="flex-1 h-8.5" />
            ))}
          </div>
          <Skeleton className="flex-1 w-full" />
        </div>
      </div>
    </motion.section>
  );
};

export default FolderSkeleton;
