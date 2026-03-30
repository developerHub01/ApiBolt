import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateTestScript } from "@renderer/context/redux/request-response/thunks/test-script";
import { selectSelectedScript } from "@renderer/context/redux/request-response/selectors/test-script";

interface RequestTestScriptContext {
  code: string;
  handleChangeScript: (newCode: string) => void;
  handleBlurScript: () => void;
}

const RequestTestScriptContext = createContext<RequestTestScriptContext | null>(
  null,
);

export const useRequestTestScript = () => {
  const context = useContext(RequestTestScriptContext);

  if (!context) {
    throw new Error(
      "useRequestTestScript must be used within a RequestTestScriptProvider.",
    );
  }

  return context;
};

interface RequestTestScriptProviderProps {
  children: React.ReactNode;
}

const RequestTestScriptProvider = ({
  children,
}: RequestTestScriptProviderProps) => {
  const dispatch = useAppDispatch();
  const [lineWrap, setLineWrap] = useState<boolean>(false);
  const [code, setCode] = useState<string | null>(null);
  const codeScript = useAppSelector(selectSelectedScript) ?? "";

  useEffect(() => {
    setCode(codeScript);
  }, [codeScript]);

  const handleChangeScript = (newCode: string) => setCode(newCode);

  const handleBlurScript = () =>
    dispatch(
      updateTestScript({
        script: code ?? "",
      }),
    );

  return (
    <RequestTestScriptContext.Provider
      value={{
        code: code ?? "",
        handleChangeScript,
        handleBlurScript,
      }}
    >
      {children}
    </RequestTestScriptContext.Provider>
  );
};

export default RequestTestScriptProvider;
