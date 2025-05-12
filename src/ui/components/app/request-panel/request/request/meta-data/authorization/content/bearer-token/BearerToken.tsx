import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";

const BearerToken = () => {
  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="bearer-token">
          Token
        </AuthContentInoutLabel>
        <AuthContentInput id="bearer-token" placeholder="Token" />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default BearerToken;
