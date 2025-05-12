import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import AuthContentSelect from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentSelect";

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
  const handleAddToChange = () => {};
  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-key">Key</AuthContentInoutLabel>
        <AuthContentInput id="api-key" placeholder="Key" />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-value">Value</AuthContentInoutLabel>
        <AuthContentInput id="api-key" placeholder="Value" />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Add to
        </AuthContentInoutLabel>
        <AuthContentSelect
          id="api-key"
          className="w-auto"
          items={addToList}
          value={addToList[0].id}
          onChange={handleAddToChange}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default APIKey;
