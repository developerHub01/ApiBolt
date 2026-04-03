import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { TTestResults, TTestResultTab } from "@shared/types/test-script.types";
import { selectTestResult } from "@/context/redux/request-response/selectors/test-script";

interface TestResultContext {
  resultTab: TTestResultTab;
  result: TTestResults;
  resultCount: number;
  handleChangeResultTab: (value: TTestResultTab) => void;
}

const TestResultContext = createContext<TestResultContext | null>(null);

export const useTestResult = () => {
  const context = useContext(TestResultContext);

  if (!context) {
    throw new Error("useTestResult must be used within a TestResultProvider.");
  }

  return context;
};

interface TestResultProviderProps {
  children: React.ReactNode;
}

const getResultBasedOnTab = (result: TTestResults, tab: TTestResultTab) => {
  const run = (result: TTestResults) => {
    if (tab === "all") return result;
    return result.filter(item => {
      console.log({ item });
      switch (item.type) {
        case "print":
        case "summary":
          return true;
        case "test":
          // console.log({
          //   name: item.name,
          //   success: item.success,
          //   reallity:
          //     (tab === "success" && item.success) ||
          //     (tab === "failed" && !item.success),
          // });
          return (
            (tab === "success" && item.success) ||
            (tab === "failed" && !item.success)
          );
        case "group": {
          const filteredChildren = run(item.children ?? []);
          item.children = filteredChildren;
          return true;
        }
        default:
          return false;
      }
    });
  };

  return run(structuredClone(result));
};

const TestResultProvider = ({ children }: TestResultProviderProps) => {
  const [resultTab, setResultTab] = useState<TTestResultTab>("all");
  const testResult = useAppSelector(selectTestResult);

  const result = useMemo(
    () => getResultBasedOnTab(testResult, resultTab),
    [resultTab, testResult],
  );

  const resultCount = useMemo(() => result.length, [result]);

  const handleChangeResultTab = useCallback(
    (value: TTestResultTab) => setResultTab(value),
    [],
  );

  return (
    <TestResultContext.Provider
      value={{
        resultTab,
        handleChangeResultTab,
        result,
        resultCount,
      }}
    >
      {children}
    </TestResultContext.Provider>
  );
};

export default TestResultProvider;
