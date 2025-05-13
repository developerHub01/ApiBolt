import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

const BearerToken = () => {
  const { bearerTokenAuth, handleChangeBearerTokenAuth } = useRequestResponse();

  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="bearer-token">
          Token
        </AuthContentInoutLabel>
        <AuthContentInput
          id="bearer-token"
          placeholder="Token"
          type="password"
          value={bearerTokenAuth}
          onBlur={handleChangeBearerTokenAuth}
          className="w-full"
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default BearerToken;
