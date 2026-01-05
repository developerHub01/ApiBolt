import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHaveLocalPassword } from "@/context/redux/local-password/selectors/local-password";
import { selectLocalPasswordIsLoading } from "@/context/redux/status/selectors/local-password";

interface LocalPasswordContext {
  stage: TLocalPasswordStage | null;
  isDisableRequest: boolean;
  handleChangeStage: (level: TLocalPasswordStage) => void;
  handleChangeDisableRequest: (value: boolean) => void;
}

export type TLocalPasswordStage = "protect" | "option" | "change";

const LocalPasswordContext = createContext<LocalPasswordContext | null>(null);

export const useLocalPassword = () => {
  const context = useContext(LocalPasswordContext);

  if (!context) {
    throw new Error(
      "useLocalPassword must be used within a LocalPasswordProvider.",
    );
  }

  return context;
};

interface LocalPasswordProviderProps {
  children: React.ReactNode;
}

const LocalPasswordProvider = ({ children }: LocalPasswordProviderProps) => {
  const haveLocalPassword = useAppSelector(selectHaveLocalPassword);
  const isLocalPasswordLoading = useAppSelector(selectLocalPasswordIsLoading);
  const [stage, setStage] = useState<TLocalPasswordStage | null>(null);
  const [isDisableRequest, setIsDisableRequest] = useState<boolean>(false);

  const handleChangeStage = (level: TLocalPasswordStage) => setStage(level);

  const handleChangeDisableRequest = (value: boolean) =>
    setIsDisableRequest(value);

  useEffect(() => {
    if (isLocalPasswordLoading) return;
    setStage(haveLocalPassword ? "protect" : "option");
  }, [haveLocalPassword, isLocalPasswordLoading]);

  return (
    <LocalPasswordContext.Provider
      value={{
        stage,
        isDisableRequest,
        handleChangeStage,
        handleChangeDisableRequest,
      }}
    >
      {children}
    </LocalPasswordContext.Provider>
  );
};

export default LocalPasswordProvider;
