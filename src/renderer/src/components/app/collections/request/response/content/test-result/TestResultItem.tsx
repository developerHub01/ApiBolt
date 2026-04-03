import { memo, useState } from "react";
import {
  TestResultInterface,
  TTestResultType,
} from "@shared/types/test-script.types";
import TestStatus from "@/components/app/collections/request/response/content/test-result/TestStatus";
import { AnimatePresence, motion } from "motion/react";
import {
  Boxes as GroupIcon,
  ChevronDown as ChevronDownIcon,
  Printer as PrintIcon,
  ListChevronsDownUp as SummaryIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TestResultSummary from "@/components/app/collections/request/response/content/test-result/TestResultSummary";
import TestResultContentWrapper from "@/components/app/collections/request/response/content/test-result/TestResultContentWrapper";
import Empty from "@/components/ui/empty";

const plainPayload = new Set<TTestResultType>(["test", "print"]);

const TestResultItem = memo((props: TestResultInterface) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <motion.div
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
        {props.type === "test" ? (
          <TestStatus success={props.success} />
        ) : props.type === "print" ? (
          <PrintIcon size={22} />
        ) : props.type === "group" ? (
          <GroupIcon size={22} />
        ) : (
          <SummaryIcon size={22} />
        )}
        <h3 className="flex-1 font-medium text-foreground text-sm leading-tight">
          {props.name}
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
            onClick={e => e.stopPropagation()}
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
            {plainPayload.has(props.type) && "message" in props ? (
              <p className="text-sm text-muted-foreground">{props.message}</p>
            ) : props.type === "summary" ? (
              <TestResultSummary summary={props.summary} />
            ) : props.type === "group" ? (
              <div className="pl-5 md:pl-10">
                {props.children?.length ? (
                  <TestResultContentWrapper>
                    {props.children.map((child, index) => (
                      <TestResultItem key={index} {...child} />
                    ))}
                  </TestResultContentWrapper>
                ) : (
                  <Empty
                    label="Empty group."
                    description="This group is empty try to add script inside callback to see result."
                    showFallback
                    fallbackClassName="w-20"
                    oriantation="horizontal"
                  />
                )}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default TestResultItem;
