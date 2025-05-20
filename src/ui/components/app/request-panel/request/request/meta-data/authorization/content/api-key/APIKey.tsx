import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import AuthContentSelect from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentSelect";
import {
  defaultApiKey,
  useRequestResponse,
} from "@/context/request/RequestResponseProvider";

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
  const { apiKeyAuth, selectedTab, handleChangeAPIKey } = useRequestResponse();

  const authData = apiKeyAuth[selectedTab] ?? defaultApiKey;

  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-key">Key</AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          placeholder="Key"
          value={authData.key}
          onBlur={(value) => handleChangeAPIKey("key", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-value">Value</AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          placeholder="Value"
          type="password"
          value={authData.value}
          onBlur={(value) => handleChangeAPIKey("value", value)}
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
          onChange={(value) => handleChangeAPIKey("addTo", value)}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default APIKey;
