import { memo } from "react";
import NoAuth from "@/components/app/authorization/content/no-auth/NoAuth";
import BasicAuth from "@/components/app/authorization/content/basic-auth/BasicAuth";
import BearerToken from "@/components/app/authorization/content/bearer-token/BearerToken";
import JWTBearer from "@/components/app/authorization/content/jwt-bearer/JWTBearer";
import APIKey from "@/components/app/authorization/content/api-key/APIKey";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import { selectAuthType } from "@/context/redux/request-response/request-response-selector";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const AuthContent = memo(({ className = "" }: Props) => {
  const authType = useAppSelector(selectAuthType);

  return (
    <ScrollArea
      className={cn("w-full h-full min-h-0 py-2 [&>div>div]:h-full", className)}
    >
      {authType === "no-auth" && <NoAuth />}
      {authType === "basic-auth" && <BasicAuth />}
      {authType === "bearer-token" && <BearerToken />}
      {authType === "jwt-bearer" && <JWTBearer />}
      {authType === "api-key" && <APIKey />}
    </ScrollArea>
  );
});

export default AuthContent;
