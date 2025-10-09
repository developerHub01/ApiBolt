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

interface Props {
  id: string;
  className?: string;
}

const AuthContent = memo(({ id, className = "" }: Props) => {
  const authType = useAppSelector(selectAuthType);

  return (
    <ScrollArea
      className={cn("w-full min-h-0 py-2 [&>div>div]:h-full", className)}
    >
      {authType === "inherit-parent" && <InheritParent />}
      {authType === "no-auth" && <NoAuth />}
      {authType === "basic-auth" && <BasicAuth id={id} />}
      {authType === "bearer-token" && <BearerToken id={id} />}
      {authType === "jwt-bearer" && <JWTBearer id={id} />}
      {authType === "api-key" && <APIKey id={id} />}
    </ScrollArea>
  );
});

export default AuthContent;
