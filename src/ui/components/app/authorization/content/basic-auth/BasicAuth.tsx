import { useCallback } from "react";
import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/request-response-thunk";
import { defaultBasicAuth } from "@/constant/request-response.constant";

const BasicAuth = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(
    (state) => state.requestResponse.basicAuth ?? defaultBasicAuth
  );

  const handleBlur = useCallback(
    (key: "basicAuthUsername" | "basicAuthPassword", value: string) => {
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
        <AuthContentInoutLabel htmlFor="basic-auth-username">
          Username
        </AuthContentInoutLabel>
        <AuthContentInput
          id="basic-auth-username"
          placeholder="Username"
          value={authData.username}
          onBlur={(value) => handleBlur("basicAuthUsername", value)}
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
          value={authData.password}
          onBlur={(value) => handleBlur("basicAuthPassword", value)}
          className="w-full"
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default BasicAuth;
