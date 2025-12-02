import { memo, useCallback } from "react";
import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import type { BasicAuthInterface } from "@shared/types/authorization.types";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";

interface Props {
  id?: string;
  disabled?: boolean;
  authData: BasicAuthInterface;
}

const BasicAuth = memo(({ id, authData, disabled = false }: Props) => {
  const dispatch = useAppDispatch();
  const handleBlur = useCallback(
    (key: "basicAuthUsername" | "basicAuthPassword", value: string) => {
      dispatch(
        updateAuthorization({
          payload: {
            [key]: value.trim(),
          },
        })
      );
    },
    [dispatch]
  );

  return (
    <ContentWrapper id={id}>
      <AuthContentInoutLabel htmlFor="basic-auth-username" className="w-17">
        Username
      </AuthContentInoutLabel>
      <AuthContentInput
        id="basic-auth-username"
        placeholder="Username"
        value={authData.username}
        onBlur={(value) => handleBlur("basicAuthUsername", value)}
        disabled={disabled}
      />
      <AuthContentInoutLabel htmlFor="basic-auth-password" className="w-17">
        Password
      </AuthContentInoutLabel>
      <AuthContentInput
        id="basic-auth-password"
        placeholder="Password"
        type="password"
        value={authData.password}
        onBlur={(value) => handleBlur("basicAuthPassword", value)}
        disabled={disabled}
      />
    </ContentWrapper>
  );
});

export default BasicAuth;
