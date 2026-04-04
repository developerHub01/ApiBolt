import { KeyboardEvent, memo, useMemo, useState } from "react";
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
  Code as CodeIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TestResultSummary from "@/components/app/collections/request/response/content/test-result/TestResultSummary";
import TestResultContentWrapper from "@/components/app/collections/request/response/content/test-result/TestResultContentWrapper";
import Empty from "@/components/ui/empty";
import TestResultCode from "@/components/app/collections/request/response/content/test-result/TestResultCode";
import LineIndicator from "@/components/app/collections/request/response/content/test-result/LineIndicator";

const plainPayload = new Set<TTestResultType>(["test", "print"]);

interface Props {
  level: number;
  isLast?: boolean;
  result: TestResultInterface;
}

const TestResultItem = memo(({ result, level, isLast = false }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const showDetails = useMemo(
    () =>
      (result.type === "test" && Boolean(result.message)) ||
      (result.type === "print" && Boolean(result.message)) ||
      (result.type === "summary" && Boolean(result.summary)) ||
      (result.type === "code" && Boolean(result.code)) ||
      (result.type === "group" && Boolean(result.children)),
    [result],
  );

  const handleToggle = () => {
    if (window.getSelection()?.toString() || !showDetails) return;
    setIsOpen(prev => !prev);
  };

  const handlePreContentKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      e.preventDefault();

      const selection = window.getSelection();
      const range = document.createRange();

      if (selection) {
        range.selectNodeContents(e.currentTarget);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <div
      onClick={handleToggle}
      className="flex flex-col gap-3 min-h-9 hover:bg-secondary/50 transition-colors p-3 cursor-pointer text-start relative"
    >
      <LineIndicator level={level} isLast={isLast} />
      <div className="flex-1 min-w-0 flex gap-3 items-center">
        {result.type === "test" ? (
          <TestStatus success={result.success} />
        ) : (
          <div className="h-full w-10 flex justify-center items-center">
            {result.type === "print" ? (
              <PrintIcon size={22} />
            ) : result.type === "group" ? (
              <GroupIcon size={22} />
            ) : result.type === "summary" ? (
              <SummaryIcon size={22} />
            ) : result.type === "code" ? (
              <CodeIcon size={22} />
            ) : null}
          </div>
        )}
        <h3 className="flex-1 font-medium text-foreground text-sm leading-tight">
          {result.name}
        </h3>
        {showDetails && (
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
        )}
      </div>
      <AnimatePresence>
        {isOpen && showDetails && (
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
            className="origin-left cursor-auto"
          >
            {plainPayload.has(result.type) && "message" in result ? (
              <pre
                tabIndex={0}
                className="w-full whitespace-pre-wrap break-all"
                onClick={e => e.stopPropagation()}
                onKeyDown={handlePreContentKeydown}
              >
                <p className="w-full text-sm text-muted-foreground cursor-text select-text">
                  {result.message}
                </p>
              </pre>
            ) : result.type === "code" ? (
              <TestResultCode code={result.code} language={result.language} />
            ) : result.type === "summary" ? (
              <TestResultSummary summary={result.summary} />
            ) : result.type === "group" ? (
              <div className="pl-10 pr-4 select-text relative">
                {result.children?.length ? (
                  <TestResultContentWrapper>
                    {result.children.map((child, index) => (
                      <TestResultItem
                        key={index}
                        level={1}
                        result={child}
                        isLast={result.children.length - 1 === index}
                      />
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
    </div>
  );
});

export default TestResultItem;
