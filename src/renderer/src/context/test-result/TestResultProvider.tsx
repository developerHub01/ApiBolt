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

const TestResultProvider = ({ children }: TestResultProviderProps) => {
  const [resultTab, setResultTab] = useState<TTestResultTab>("all");
  const testResult = useAppSelector(selectTestResult);

  const result = useMemo(
    () =>
      resultTab === "all"
        ? testResult
        : resultTab === "success"
          ? testResult.filter(item => item.success)
          : testResult.filter(item => !item.success),
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
