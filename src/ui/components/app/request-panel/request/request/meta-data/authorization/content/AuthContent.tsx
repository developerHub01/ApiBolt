import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import NoAuth from "@/components/app/request-panel/request/request/meta-data/authorization/content/no-auth/NoAuth";
import BasicAuth from "@/components/app/request-panel/request/request/meta-data/authorization/content/basic-auth/BasicAuth";
import BearerToken from "@/components/app/request-panel/request/request/meta-data/authorization/content/bearer-token/BearerToken";
import JWTBearer from "@/components/app/request-panel/request/request/meta-data/authorization/content/jwt-bearer/JWTBearer";
import APIKey from "@/components/app/request-panel/request/request/meta-data/authorization/content/api-key/APIKey";
import { ScrollArea } from "@/components/ui/scroll-area";

const AuthContent = () => {
  const { authType, selectedTab } = useRequestResponse();
  return (
    <ScrollArea className="w-full h-full pl-2 md:pl-2.5 ">
      {authType[selectedTab] === "no-auth" && <NoAuth />}
      {authType[selectedTab] === "basic-auth" && <BasicAuth />}
      {authType[selectedTab] === "bearer-token" && <BearerToken />}
      {authType[selectedTab] === "jwt-bearer" && <JWTBearer />}
      {authType[selectedTab] === "api-key" && <APIKey />}
    </ScrollArea>
  );
};

export default AuthContent;
