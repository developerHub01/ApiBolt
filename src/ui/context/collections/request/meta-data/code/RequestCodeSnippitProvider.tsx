import React, { createContext, useContext } from "react";
import { useAppSelector } from "@/context/redux/hooks";
// import { generateCode } from "@/utils/snippet-generator";
import { selectFilterAndUniqueMetaData } from "@/context/redux/request-response/selectors/meta-request";
import { selectIsHttpMethodType } from "@/context/redux/request-response/selectors/request-list";
import { selectParsedRequestUrl } from "@/context/redux/request-url/selectors/url";
import type { THTTPMethods } from "@/types/request-response.types";
import {
  selectRawData,
  selectRawRequestBodyType,
  selectRequestBodyType,
} from "@/context/redux/request-response/selectors/body-raw";

interface RequestCodeSnippitContext {
  method: THTTPMethods;
  url: string;
  headers: Array<{
    key: string;
    value: string | undefined;
  }>;
  authorization?: string;
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
  const method = useAppSelector(selectIsHttpMethodType);
  const url = useAppSelector(selectParsedRequestUrl);
  const bodyType = useAppSelector(selectRequestBodyType);
  const rawBodyDataType = useAppSelector(selectRawRequestBodyType);
  const rawData = useAppSelector(selectRawData);
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
  )?.find((header) => header.id === "authorization")?.value;

  console.log({
    headers,
    authorization,
    bodyType,
    rawBodyDataType,
    rawData,
    xWWWFormUrlencoded,
    formData,
  });

  // const code = generateCode("javascript-fetch");
  // console.log(code);

  return (
    <RequestCodeSnippitContext.Provider
      value={{
        method,
        url,
        headers,
        authorization,
      }}
    >
      {children}
    </RequestCodeSnippitContext.Provider>
  );
};

export default RequestCodeSnippitProvider;
