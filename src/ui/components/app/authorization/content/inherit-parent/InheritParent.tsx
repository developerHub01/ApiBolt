import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadInheritParentAuthorization } from "@/context/redux/request-response/thunks/auth";
import InheritParentContent from "@/components/app/authorization/content/inherit-parent/InheritParentContent";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultAuthorizationId } from "@/constant/authorization.constant";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  id: string;
}

const InheritParent = memo(({ id }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inheritId, setInheritId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const targetId =
        (await dispatch(loadInheritParentAuthorization(id)).unwrap()) ??
        defaultAuthorizationId;
      setInheritId(targetId);
      setIsLoading(false);
    })();
  }, [dispatch, id]);

  return (
    <AnimatePresence>
      {isLoading || !inheritId ? (
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
            <div key={rowIndex} className="flex gap-2 flex-1">
              {Array.from({ length: 2 }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-full w-full" />
              ))}
            </div>
          ))}
          <Skeleton className="h-12 w-full rounded-md" />
        </motion.div>
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
          <InheritParentContent id={inheritId} />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default InheritParent;
