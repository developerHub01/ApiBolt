import { memo } from "react";
import NoAuth from "@/components/app/authorization/content/no-auth/NoAuth";
import BasicAuth from "@/components/app/authorization/content/basic-auth/BasicAuth";
import BearerToken from "@/components/app/authorization/content/bearer-token/BearerToken";
import JWTBearer from "@/components/app/authorization/content/jwt-bearer/JWTBearer";
import APIKey from "@/components/app/authorization/content/api-key/APIKey";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";
import InheritParent from "@/components/app/authorization/content/inherit-parent/InheritParent";
import { selectAuthType } from "@/context/redux/request-response/selectors/auth";
import useGetAuthData from "@/hooks/auth/use-get-auth-data";

interface Props {
  id: string;
  className?: string;
}

const AuthContent = memo(({ id, className = "" }: Props) => {
  const authType = useAppSelector(selectAuthType);
  const {
    basicAuthData,
    bearerTokenAuthData,
    jwtBearerAuthData,
    apiKeyAuthData,
  } = useGetAuthData(id);

  return (
    <ScrollArea
      className={cn("w-full flex-1 min-h-0 py-2 [&>div>div]:h-full", className)}
    >
      {authType === "inherit-parent" && <InheritParent />}
      {authType === "no-auth" && <NoAuth />}
      {authType === "basic-auth" && (
        <BasicAuth id={id} authData={basicAuthData} />
      )}
      {authType === "bearer-token" && (
        <BearerToken id={id} authData={bearerTokenAuthData} />
      )}
      {authType === "jwt-bearer" && (
        <JWTBearer id={id} authData={jwtBearerAuthData} />
      )}
      {authType === "api-key" && <APIKey id={id} authData={apiKeyAuthData} />}
    </ScrollArea>
  );
});

export default AuthContent;
