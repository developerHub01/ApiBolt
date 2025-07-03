import ContentWrapper from "@/components/app/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useCallback } from "react";
import { handleChangeBearerTokenAuth } from "@/context/redux/request-response/request-response-slice";

const BearerToken = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(
    (state) =>
      state.requestResponse.bearerTokenAuth[state.requestResponse.selectedTab!] ?? ""
  );

  const handleBlur = useCallback(
    (value: string) => {
      dispatch(
        handleChangeBearerTokenAuth({
          value,
        })
      );
    },
    [dispatch]
  );

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
          value={authData}
          onBlur={handleBlur}
          className="w-full"
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default BearerToken;
