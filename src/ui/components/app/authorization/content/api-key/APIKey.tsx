import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import AuthContentSelect from "@/components/app/authorization/content/AuthContentSelect";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { defaultApiKey } from "@/context/redux/request-response/request-response-slice";
import { useCallback } from "react";
import { updateAuthorization } from "@/context/redux/request-response/request-response-thunk";

const addToList = [
  {
    id: "header",
    label: "Header",
  },
  {
    id: "query",
    label: "Query Params",
  },
];

const APIKey = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(
    (state) => state.requestResponse.apiKeyAuth ?? defaultApiKey
  );

  const handleBlur = useCallback(
    (key: "apiKeyKey" | "apiKeyValue" | "apiKeyAddTo", value: string) => {
      dispatch(
        updateAuthorization({
          [key]: value,
        })
      );
    },
    [dispatch]
  );

  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-key">Key</AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          placeholder="Key"
          value={authData.key}
          onBlur={(value) => handleBlur("apiKeyKey", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-value">Value</AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          placeholder="Value"
          type="password"
          value={authData.value}
          onBlur={(value) => handleBlur("apiKeyValue", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Add to
        </AuthContentInoutLabel>
        <AuthContentSelect
          id="api-key"
          className="w-full"
          items={addToList}
          value={authData.addTo}
          onChange={(value) => handleBlur("apiKeyAddTo", value)}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default APIKey;
