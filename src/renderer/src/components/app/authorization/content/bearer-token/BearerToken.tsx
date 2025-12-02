import { memo, useCallback } from "react";
import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";

interface Props {
  id?: string;
  disabled?: boolean;
  authData: string;
  onBlur?: (value: string) => void;
}

const BearerToken = memo(({ id, authData, disabled = false }: Props) => {
  const dispatch = useAppDispatch();
  const handleBlur = useCallback(
    (value: string) => {
      dispatch(
        updateAuthorization({
          payload: {
            bearerToken: value.trim()
          }
        })
      );
    },
    [dispatch]
  );

  return (
    <ContentWrapper id={id}>
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
