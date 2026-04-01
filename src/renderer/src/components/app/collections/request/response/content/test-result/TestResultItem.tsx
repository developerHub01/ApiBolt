import { memo, useState } from "react";
import { TestResultInterface } from "@shared/types/test-script.types";
import TestStatus from "@/components/app/collections/request/response/content/test-result/TestStatus";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props extends TestResultInterface {}

const TestResultItem = memo(({ success, name, message }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <motion.button
      onClick={handleToggle}
      className="flex flex-col gap-3 min-h-9 hover:bg-secondary/50 transition-colors py-2 cursor-pointer text-start"
      animate={{
        height: "auto",
      }}
      initial={{
        paddingLeft: 0,
        paddingRight: 0,
        height: "0",
      }}
      whileHover={{
        paddingLeft: 8,
        paddingRight: 8,
      }}
      transition={{
        layout: {
          duration: 0.3,
          ease: "easeInOut",
        },
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="flex-1 min-w-0 flex gap-3 items-center">
        <TestStatus success={success} />
        <h3 className="flex-1 font-medium text-foreground text-sm leading-tight">
          {name}
        </h3>
        <div
          className={buttonVariants({
            variant: "ghost",
            size: "iconXs",
          })}
        >
          <ChevronDownIcon
            className={cn("transition-transform duration-75", {
              "rotate-180": isOpen,
            })}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              height: "0",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              height: "0",
            }}
            transition={{
              duration: 0.2,
            }}
            className="origin-left"
          >
            <p className="text-sm text-muted-foreground">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
});

export default TestResultItem;
