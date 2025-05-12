import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";

const BasicAuth = () => {
  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="basic-auth-username">
          Username
        </AuthContentInoutLabel>
        <AuthContentInput id="basic-auth-username" placeholder="Username" />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="basic-auth-password">
          Password
        </AuthContentInoutLabel>
        <AuthContentInput id="basic-auth-password" placeholder="Password" />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default BasicAuth;
