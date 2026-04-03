import { lazy, Suspense } from "react";
const TestResultContent = lazy(
  () =>
    import("@/components/app/collections/request/response/content/test-result/TestResultContent"),
);
import TestResultProvider from "@/context/test-result/TestResultProvider";
import ResposneTestResultFallback from "@/fallback/collection/request/response/ResposneTestResultFallback";

const TestResult = () => {
  return (
    <TestResultProvider>
      <Suspense fallback={<ResposneTestResultFallback />}>
        <TestResultContent />
      </Suspense>
    </TestResultProvider>
  );
};

export default TestResult;
