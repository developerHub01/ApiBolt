import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import AuthContentSelect from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentSelect";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

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
  const { apiKeyAuth, handleChangeAPIKey } = useRequestResponse();

  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-key">Key</AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          placeholder="Key"
          value={apiKeyAuth.key}
          onBlur={(value) => handleChangeAPIKey("key", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-value">Value</AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          placeholder="Value"
          type="password"
          value={apiKeyAuth.value}
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
          value={apiKeyAuth.addTo ?? addToList[0].id}
          onChange={(value) => handleChangeAPIKey("addTo", value)}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default APIKey;
