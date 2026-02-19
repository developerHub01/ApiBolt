import { memo } from "react";
import InheritParentContent from "@/components/app/authorization/content/inherit-parent/InheritParentContent";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "motion/react";
import { useCollection } from "@/context/collections/CollectionProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectAuthInheritedId } from "@/context/redux/request-response/selectors/auth";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const InheritParent = memo(() => {
  const { isLoading } = useCollection();
  const inheritAuthId = useAppSelector(selectAuthInheritedId);
  const showSkeleton = useShowSkeleton(isLoading || !inheritAuthId);

  return (
    <AnimatePresence>
      {showSkeleton ? (
        <ScrollArea className="w-full min-h-0 h-full [&>div>div]:h-full">
          <motion.div
            key="inherit-parent-skeleton"
            layout="position"
            className="h-full flex flex-col gap-2"
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
            }}
          >
            <Skeleton className="h-12 w-full rounded-md" />
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-2 h-7 md:h-8 shrink-0 grow"
              >
                {Array.from({ length: 2 }).map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-full w-full" />
                ))}
              </div>
            ))}
            <Skeleton className="h-12 w-full rounded-md" />
          </motion.div>
        </ScrollArea>
      ) : (
        <motion.div
          key="inherit-parent-content"
          layout="position"
          className="w-full h-full flex flex-col gap-2"
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
          }}
        >
          <InheritParentContent id={inheritAuthId!} />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default InheritParent;
