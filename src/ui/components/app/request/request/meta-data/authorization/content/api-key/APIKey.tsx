import ContentWrapper from "@/components/app/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import AuthContentSelect from "@/components/app/request/request/meta-data/authorization/content/AuthContentSelect";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  defaultApiKey,
  handleChangeAPIKey,
} from "@/context/redux/request-response/request-response-slice";
import { useCallback } from "react";

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
    (state) =>
      state.requestResponse.apiKeyAuth[state.requestResponse.selectedTab!] ??
      defaultApiKey
  );

  const handleBlur = useCallback(
    (key: "key" | "value" | "addTo", value: string) => {
      dispatch(
        handleChangeAPIKey({
          key,
          value,
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
          onBlur={(value) => handleBlur("key", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-value">Value</AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          placeholder="Value"
          type="password"
          value={authData.value}
          onBlur={(value) => handleBlur("value", value)}
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
          onChange={(value) => handleBlur("addTo", value)}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default APIKey;
