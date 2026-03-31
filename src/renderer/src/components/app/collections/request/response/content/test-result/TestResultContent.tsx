import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import HistorySkeleton from "@/components/app/collections/request/response/content/history/skeleton/HistorySkeleton";
import Empty from "@/components/ui/empty";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import animationData from "@/assets/lottie/no-search-item-available.json";
import TestResultItem from "@/components/app/collections/request/response/content/test-result/TestResultItem";
import TestResultTop from "@/components/app/collections/request/response/content/test-result/TestResultTop";
import {
  selectTestScriptIsLoading,
  selectTestScriptIsRunning,
} from "@/context/redux/status/selectors/test-script";
import {
  selectTestError,
  selectTestIsSuccess,
} from "@/context/redux/request-response/selectors/test-script";
import { useTestResult } from "@/context/test-result/TestResultProvider";
import ErrorBlock from "@/components/app/collections/request/response/content/ErrorBlock";

const TestResultContent = () => {
  const isLoading = useAppSelector(selectTestScriptIsLoading);
  const isRunning = useAppSelector(selectTestScriptIsRunning);
  const isSuccess = useAppSelector(selectTestIsSuccess);
  const errorMessage = useAppSelector(selectTestError);
  const { result } = useTestResult();
  const showSkeleton = useShowSkeleton(isLoading || isRunning);

  if (showSkeleton) return <HistorySkeleton />;

  return (
    <section className="flex-1 flex flex-col gap-2">
      {Boolean(isSuccess) && <TestResultTop />}
      <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
        {isSuccess ? (
          !result.length ? (
            <Empty
              label="No test result found."
              animationData={animationData}
              showFallback
              innerClassName="w-56"
            />
          ) : (
            <div className="flex flex-col divide-y divide-border/50">
              {result.map((meta, index) => (
                <TestResultItem key={index} {...meta} />
              ))}
            </div>
          )
        ) : (
          <ErrorBlock
            message={"Test script failed to run."}
            description={errorMessage}
          />
        )}
      </ScrollArea>
    </section>
  );
};

export default TestResultContent;
