import React, { createContext, useContext } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { generateCode } from "@/utils/snippet-generator";
import { selectFilterAndUniqueMetaData } from "@/context/redux/request-response/selectors/meta-request";
import { selectIsHttpMethodType } from "@/context/redux/request-response/selectors/request-list";
import { selectParsedRequestUrl } from "@/context/redux/request-url/selectors/url";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";
import { selectBinaryData } from "@/context/redux/request-response/selectors/body-binary";
import { selectSelectedCodeSnippit } from "@/context/redux/request-response/selectors/code-snippit";
import { isStringIsValidObject, isValidJson } from "@/utils/helper";

interface RequestCodeSnippitContext {
  code: string;
  language: string;
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
  const selectedCodeType = useAppSelector(selectSelectedCodeSnippit);
  const method = useAppSelector(selectIsHttpMethodType);
  const url = useAppSelector(selectParsedRequestUrl);
  const bodyType = useAppSelector(selectRequestBodyType);
  const rawBodyDataType = useAppSelector(selectRawRequestBodyType);
  const rawData = useAppSelector(selectRawData);
  const binaryData = useAppSelector(selectBinaryData)?.path;
  const xWWWFormUrlencoded =
    useAppSelector(
      selectFilterAndUniqueMetaData({
        type: "x-www-form-urlencoded",
      })
    )?.map((form) => ({
      key: form.key,
      value: form.value,
    })) ?? [];
  const formData =
    useAppSelector(
      selectFilterAndUniqueMetaData({
        type: "form-data",
      })
    )?.map((form) => ({
      key: form.key,
      value: form.value,
    })) ?? [];

  const headers =
    useAppSelector(
      selectFilterAndUniqueMetaData({
        type: "headers",
      })
    )?.map((header) => ({
      key: header.key,
      value: header.value,
    })) ?? [];

  const authorization = useAppSelector(
    selectFilterAndUniqueMetaData({
      type: "hiddenHeaders",
    })
  )?.find((header) => header.id === "authorization")?.value as
    | string
    | undefined;

  console.log(isValidJson(rawData));
  console.log(isStringIsValidObject(rawData));

  const code = generateCode(selectedCodeType, {
    url,
    method,
    headers,
    authorization,
    bodyType,
    rawBodyDataType,
    rawData: rawData,
    xWWWFormUrlencoded,
    formData,
    binaryData,
  });
  const language = selectedCodeType?.split("-")[0];

  return (
    <RequestCodeSnippitContext.Provider
      value={{
        code,
        language,
      }}
    >
      {children}
    </RequestCodeSnippitContext.Provider>
  );
};

export default RequestCodeSnippitProvider;
