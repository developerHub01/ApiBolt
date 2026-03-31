import { lazy, Suspense } from "react";
const TestResultContent = lazy(
  () =>
    import("@/components/app/collections/request/response/content/test-result/TestResultContent"),
);
import HistorySkeleton from "@/components/app/collections/request/response/content/history/skeleton/HistorySkeleton";
import TestResultProvider from "@/context/test-result/TestResultProvider";

const TestResult = () => {
  return (
    <TestResultProvider>
      <Suspense fallback={<HistorySkeleton />}>
        <TestResultContent />
      </Suspense>
    </TestResultProvider>
  );
};

export default TestResult;
