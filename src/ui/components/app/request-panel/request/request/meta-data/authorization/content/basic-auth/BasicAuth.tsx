import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  defaultBasicAuth,
  handleChangeBasicAuth,
} from "@/context/redux/request-response/request-response-slice";
import { useCallback } from "react";

const BasicAuth = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(
    (state) =>
      state.requestResponse.basicAuth[state.requestResponse.selectedTab!] ??
      defaultBasicAuth
  );

  const handleBlur = useCallback(
    (key: "username" | "password", value: string) => {
      dispatch(
        handleChangeBasicAuth({
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
        <AuthContentInoutLabel htmlFor="basic-auth-username">
          Username
        </AuthContentInoutLabel>
        <AuthContentInput
          id="basic-auth-username"
          placeholder="Username"
          value={authData.username}
          onBlur={(value) => handleBlur("username", value)}
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
          onBlur={(value) => handleBlur("password", value)}
          className="w-full"
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default BasicAuth;
