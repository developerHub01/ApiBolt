import { useAppSelector } from "@/context/redux/hooks";
import { selectFolderIsLoading } from "@/context/redux/status/selectors/folder";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import { AnimatePresence, motion } from "motion/react";
import FolderSkeleton from "@/components/app/collections/folder/skeleton/FolderSkeleton";

interface Props {
  children: React.ReactNode;
}

const FolderSkeletonWrapper = ({ children }: Props) => {
  const isLoading = useAppSelector(selectFolderIsLoading);
  const showSkeleton = useShowSkeleton(isLoading);

  return (
    <AnimatePresence>
      {showSkeleton ? (
        <FolderSkeleton />
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
