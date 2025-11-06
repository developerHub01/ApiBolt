import { memo, type ComponentProps, type KeyboardEvent } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoaderV1 from "@/components/loader-v1";

interface AnimatedDialogProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

const AnimatedDialog = memo(
  ({
    isOpen,
    onClose,
    children,
    className = "",
    overlayClassName = "",
    ...props
  }: AnimatedDialogProps & ComponentProps<"section">) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      e.stopPropagation();
      if (e.key === "Escape") onClose();
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <section
            id="setting"
            className={cn(
              "absolute top-0 left-0 w-full h-full flex justify-center items-center p-10 z-50 overflow-hidden focus:outline-0",
              className
            )}
            onClick={onClose}
            {...props}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              className={cn(
                "absolute top-0 left-0 w-full h-full bg-background/15 backdrop-blur-sm z-0",
                overlayClassName
              )}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 0.5,
                },
              }}
              transition={{
                duration: 0.2,
                ease: "linear",
              }}
            ></motion.div>
            {children}
          </section>
        )}
      </AnimatePresence>
    );
  }
);

interface AnimatedDialogContentWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const AnimatedDialogContentWrapper = memo(
  ({
    className = "",
    children,
    ...props
  }: AnimatedDialogContentWrapperProps & HTMLMotionProps<"section">) => {
    return (
      <motion.section
        className={cn(
          "relative z-1 w-full h-full max-w-2xl backdrop-blur-lg rounded-lg flex flex-col overflow-hidden shadow-2xl",
          "border bg-background/60",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        initial={{
          y: 50,
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          y: 0,
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        }}
        exit={{
          y: -20,
          scale: 0.95,
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          ease: "anticipate",
        }}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

interface AnimatedDialogTopProps {
  className?: string;
  children: React.ReactNode;
}

const AnimatedDialogTop = memo(
  ({
    className = "",
    children,
    ...props
  }: AnimatedDialogTopProps & ComponentProps<"div">) => {
    return (
      <div className={cn("border-b-2 px-3 py-2", className)} {...props}>
        {children}
      </div>
    );
  }
);

interface AnimatedDialogContentProps {
  className?: string;
  scrollAreaClassName?: string;
  children: React.ReactNode;
}

const AnimatedDialogContent = memo(
  ({
    className = "",
    scrollAreaClassName = "",
    children,
    ...props
  }: AnimatedDialogContentProps & ComponentProps<"div">) => {
    return (
      <div
        className={cn("w-full min-h-0 flex-1 [&>div>div]:h-full", className)}
        {...props}
      >
        <ScrollArea
          className={cn(
            "w-full h-full px-3 py-2 [&>div>div]:h-full",
            scrollAreaClassName
          )}
        >
          {children}
        </ScrollArea>
      </div>
    );
  }
);

const AnimatedDialogBottom = memo(
  ({
    className = "",
    children,
    ...props
  }: AnimatedDialogTopProps & ComponentProps<"div">) => {
    return (
      <div
        className={cn(
          "border-t-2 px-3 py-2 flex justify-center items-center",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

interface AnimatedDialogLoaderProps {
  isLoading?: boolean;
}

const AnimatedDialogLoader = memo(
  ({
    isLoading = false,
    className = "",
  }: AnimatedDialogLoaderProps & HTMLMotionProps<"div">) => {
    return (
      <LoaderV1 key="loader" isLoading={isLoading} className={className} />
    );
  }
);

export {
  AnimatedDialog,
  AnimatedDialogContentWrapper,
  AnimatedDialogTop,
  AnimatedDialogContent,
  AnimatedDialogBottom,
  AnimatedDialogLoader,
};
