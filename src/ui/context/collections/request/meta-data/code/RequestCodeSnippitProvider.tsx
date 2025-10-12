import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { generateCode } from "@/utils/snippet-generator";
import {
  selectAuthorizationHeaderData,
  selectFilterAndUniqueFormData,
  selectFilterAndUniqueMetaData,
} from "@/context/redux/request-response/selectors/meta-request";
import { selectIsHttpMethodType } from "@/context/redux/request-response/selectors/request-list";
import { selectParsedRequestUrl } from "@/context/redux/request-url/selectors/url";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";
import { selectBinaryData } from "@/context/redux/request-response/selectors/body-binary";
import { selectSelectedCodeSnippit } from "@/context/redux/request-response/selectors/code-snippit";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type { TRequestCodeType } from "@/types/request-code.type";
import { changeCodeSnippitType } from "@/context/redux/request-response/thunks/code-snippit";

interface RequestCodeSnippitContext {
  code: string;
  maskedCode: string;
  language: string;
  handleChangeCodeSnippitLanguageType: (
    value: TRequestCodeType
  ) => Promise<void>;
}

const RequestCodeSnippitContext =
  createContext<RequestCodeSnippitContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestCodeSnippit = () => {
  const context = useContext(RequestCodeSnippitContext);

  if (!context) {
    throw new Error(
      "useRequestCodeSnippit must be used within a RequestCodeSnippitProvider."
    );
  }

  return context;
};

interface RequestCodeSnippitProviderProps {
  children: React.ReactNode;
}

const RequestCodeSnippitProvider = ({
  children,
}: RequestCodeSnippitProviderProps) => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<string | null>(null);
  const [maskedCode, setMaskedCode] = useState<string | null>(null);
  const selectedCodeType = useAppSelector(selectSelectedCodeSnippit);
  const method = useAppSelector(selectIsHttpMethodType);
  const url = useAppSelector(selectParsedRequestUrl);
  const bodyType = useAppSelector(selectRequestBodyType);
  const rawBodyDataType = useAppSelector(selectRawRequestBodyType);
  const rawData = useAppSelector(selectRawData);
  const binaryData = useAppSelector(selectBinaryData)?.path;
  const xWWWFormUrlencoded = useAppSelector(
    selectFilterAndUniqueMetaData({
      type: "x-www-form-urlencoded",
    })
  );
  const serializedxWWWFormUrlencoded = useMemo(
    () =>
      xWWWFormUrlencoded?.map((form) => ({
        key: form.key,
        value: form.value,
      })) ?? [],
    [xWWWFormUrlencoded]
  );
  const formData = useAppSelector(selectFilterAndUniqueFormData());

  const serializedFormData = useMemo(() => {
    const serialized: CodeSnippitDataInterface["formData"] = [];

    formData?.forEach(({ key, value }) => {
      if (!Array.isArray(value))
        serialized.push({
          key,
          value,
          type: "text",
        });
      else {
        value.forEach((entry) =>
          serialized.push({
            key,
            value: entry.file,
            type: "file",
          })
        );
      }
    });

    return serialized;
  }, [formData]);

  const headers = useAppSelector(
    selectFilterAndUniqueMetaData({
      type: "headers",
    })
  );
  const serializedHeaders = useMemo(
    () =>
      headers?.map((header) => ({
        key: header.key,
        value: header.value,
      })) ?? [],
    [headers]
  );

  const authorization = useAppSelector(selectAuthorizationHeaderData());

  const serializedAuthorization = useMemo(() => {
    if (!authorization || !authorization.value) return;

    return {
      key: authorization.key,
      value: authorization.value as string,
    };
  }, [authorization]);

  useEffect(() => {
    (async () => {
      const { code, maskedCode } = await generateCode(selectedCodeType, {
        url,
        method,
        headers: serializedHeaders,
        authorization: serializedAuthorization,
        bodyType,
        rawBodyDataType,
        rawData: rawData,
        xWWWFormUrlencoded: serializedxWWWFormUrlencoded,
        formData: serializedFormData,
        binaryData,
      });
      setCode(code);
      setMaskedCode(maskedCode);
    })();
  }, [
    selectedCodeType,
    url,
    method,
    serializedHeaders,
    authorization,
    bodyType,
    rawBodyDataType,
    rawData,
    serializedxWWWFormUrlencoded,
    serializedFormData,
    binaryData,
    serializedAuthorization,
  ]);

  const language = selectedCodeType?.split("-")[0];

  const handleChangeCodeSnippitLanguageType = useCallback(
    async (value: TRequestCodeType) => {
      await dispatch(changeCodeSnippitType(value));
    },
    [dispatch]
  );

  return (
    <RequestCodeSnippitContext.Provider
      value={{
        code: code ?? "",
        maskedCode: maskedCode ?? "",
        language,
        handleChangeCodeSnippitLanguageType,
      }}
    >
      {children}
    </RequestCodeSnippitContext.Provider>
  );
};

export default RequestCodeSnippitProvider;
