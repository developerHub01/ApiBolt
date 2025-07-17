import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useCallback } from "react";
import { updateAuthorization } from "@/context/redux/request-response/request-response-thunk";

const BearerToken = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(
    (state) => state.requestResponse.bearerTokenAuth ?? ""
  );

  const handleBlur = useCallback(
    (value: string) => {
      dispatch(
        updateAuthorization({
          bearerToken: value,
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
