import { memo } from "react";
import NoAuth from "@/components/app/authorization/content/no-auth/NoAuth";
import APIKey from "@/components/app/authorization/content/api-key/APIKey";
import BasicAuth from "@/components/app/authorization/content/basic-auth/BasicAuth";
import BearerToken from "@/components/app/authorization/content/bearer-token/BearerToken";
import JWTBearer from "@/components/app/authorization/content/jwt-bearer/JWTBearer";
import { useAppSelector } from "@/context/redux/hooks";
import { selectAuthTypeById } from "@/context/redux/request-response/selectors/auth";
import useGetAuthData from "@/hooks/auth/use-get-auth-data";

interface Props {
  id: string;
}

const InheritParentContent = memo(({ id }: Props) => {
  const authType = useAppSelector(selectAuthTypeById(id));
  const {
    basicAuthData,
    bearerTokenAuthData,
    jwtBearerAuthData,
    apiKeyAuthData,
  } = useGetAuthData(id);

  return (
    <>
      {authType === "no-auth" ? (
        <NoAuth />
      ) : authType === "basic-auth" ? (
        <BasicAuth id={id} disabled authData={basicAuthData} />
      ) : authType === "bearer-token" ? (
        <BearerToken id={id} disabled authData={bearerTokenAuthData} />
      ) : authType === "jwt-bearer" ? (
        <JWTBearer id={id} disabled authData={jwtBearerAuthData} />
      ) : authType === "api-key" ? (
        <APIKey id={id} disabled authData={apiKeyAuthData} />
      ) : null}
    </>
  );
});

export default InheritParentContent;
