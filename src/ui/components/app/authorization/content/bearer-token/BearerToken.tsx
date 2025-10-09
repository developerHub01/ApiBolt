import { memo, useCallback } from "react";
import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";
import { selectAuthBearerTokenAuth } from "@/context/redux/request-response/selectors/auth";

interface Props {
  id: string;
  disabled?: boolean;
}

const BearerToken = memo(({ id, disabled = false }: Props) => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(selectAuthBearerTokenAuth(id));

  const handleBlur = useCallback(
    (value: string) => {
      dispatch(
        updateAuthorization({
          payload: {
            bearerToken: value.trim(),
          },
        })
      );
    },
    [dispatch]
  );

  return (
    <ContentWrapper>
      <AuthContentInoutLabel htmlFor="bearer-token">
        Token
      </AuthContentInoutLabel>
      <AuthContentInput
        id="bearer-token"
        placeholder="Token"
        type="password"
        value={authData}
        onBlur={handleBlur}
        disabled={disabled}
      />
    </ContentWrapper>
  );
});

export default BearerToken;
