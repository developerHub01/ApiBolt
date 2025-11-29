import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectFolderIsLoading } from "@/context/redux/status/selectors/folder";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  children: React.ReactNode;
}

const FolderSkeletonWrapper = ({ children }: Props) => {
  const isLoading = useAppSelector(selectFolderIsLoading);
  const showSkeleton = useShowSkeleton(isLoading);

  return (
    <AnimatePresence>
      {showSkeleton ? (
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
      ) : (
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
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default FolderSkeletonWrapper;
