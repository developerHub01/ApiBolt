import NoAuth from "@/components/app/authorization/content/no-auth/NoAuth";
import BasicAuth from "@/components/app/authorization/content/basic-auth/BasicAuth";
import BearerToken from "@/components/app/authorization/content/bearer-token/BearerToken";
import JWTBearer from "@/components/app/authorization/content/jwt-bearer/JWTBearer";
import APIKey from "@/components/app/authorization/content/api-key/APIKey";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";

const AuthContent = () => {
  const authType = useAppSelector((state) => state.requestResponse.authType);

  return (
    <div className="h-full min-h-0 w-full">
      <ScrollArea className="w-full h-full min-h-0 py-2">
        {authType === "no-auth" && <NoAuth />}
        {authType === "basic-auth" && <BasicAuth />}
        {authType === "bearer-token" && <BearerToken />}
        {authType === "jwt-bearer" && <JWTBearer />}
        {authType === "api-key" && <APIKey />}
      </ScrollArea>
    </div>
  );
};

export default AuthContent;
