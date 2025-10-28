import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";

interface LoaderV1Props {
  isLoading: boolean;
  className?: string;
  key?: string;
  [key: string]: unknown;
}

const LoaderV1 = ({
  isLoading,
  key = "loader",
  className,
  ...props
}: LoaderV1Props & HTMLMotionProps<"div">) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={cn("relative w-full h-1.5 bg-foreground/5", className)}
          key={key}
          exit={{ opacity: 0, height: 0 }}
          {...props}
        >
          <span className="absolute top-0 left-0 h-full w-16 rounded-full animate-loader-v1 bg-primary/80"></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderV1;
