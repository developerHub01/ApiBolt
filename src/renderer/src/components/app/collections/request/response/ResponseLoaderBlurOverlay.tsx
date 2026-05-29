import { useAppSelector } from "@/context/redux/hooks";
import { selectIsFetchApiLoading } from "@/context/redux/status/selectors/fetch-api";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion, AnimatePresence } from "motion/react";

interface Props extends HTMLMotionProps<"div"> {}

const ResponseLoaderBlurOverlay = ({
  children,
  className = "",
  ...props
}: Props) => {
  const isLoading = useAppSelector(selectIsFetchApiLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={cn(
            "absolute inset-0 backdrop-blur-xs bg-zinc-900/10 p-5 grid place-items-center",
            className,
          )}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          {...props}
        >
          {children ? (
            children
          ) : (
            <div className="w-full max-w-96 text-center flex justify-center items-center">
              <p className="text-foreground text-md animate-pulse tracking-wider">
                Sending request...
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseLoaderBlurOverlay;
