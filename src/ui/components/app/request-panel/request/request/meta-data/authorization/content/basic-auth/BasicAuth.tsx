import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

const BasicAuth = () => {
  const { basicAuth, handleChangeBasicAuth } = useRequestResponse();

  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="basic-auth-username">
          Username
        </AuthContentInoutLabel>
        <AuthContentInput
          id="basic-auth-username"
          placeholder="Username"
          value={basicAuth.username}
          onBlur={(value) => handleChangeBasicAuth("username", value)}
          className="w-full"
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="basic-auth-password">
          Password
        </AuthContentInoutLabel>
        <AuthContentInput
          id="basic-auth-password"
          placeholder="Password"
          type="password"
          value={basicAuth.password}
          onBlur={(value) => handleChangeBasicAuth("password", value)}
          className="w-full"
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default BasicAuth;
