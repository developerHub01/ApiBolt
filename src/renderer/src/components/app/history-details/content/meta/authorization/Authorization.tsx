import { memo, useMemo } from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AUTH_LIST,
  DEFAULT_API_KEY,
  DEFAULT_BASIC_AUTH,
  DEFAULT_JWT_BEARER_AUTH,
  INHERIT_AUTH,
} from "@/constant/authorization.constant";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";
import NoAuth from "@/components/app/authorization/content/no-auth/NoAuth";
import BasicAuth from "@/components/app/authorization/content/basic-auth/BasicAuth";
import BearerToken from "@/components/app/authorization/content/bearer-token/BearerToken";
import JWTBearer from "@/components/app/authorization/content/jwt-bearer/JWTBearer";
import APIKey from "@/components/app/authorization/content/api-key/APIKey";
import BorderedWrapper from "@/components/ui/bordered-wrapper";

const Authorization = memo(() => {
  const { authorization } = useAppSelector(selectHistoryDetails);
  const authType = useMemo(() => {
    if (authorization?.inheritedId) return INHERIT_AUTH.label;

    return (
      AUTH_LIST.find(item => item.id === authorization?.type) ?? INHERIT_AUTH
    ).label;
  }, [authorization]);

  const { basicAuth, apiKeyAuth, bearerAuth, jwtAuth, type } = authorization!;

  return (
    <ScrollArea className="w-full flex-1 overflow-visible min-h-0 h-full [&>div>div]:h-full shrink-0 flex flex-col gap-3">
      <div className="w-full h-full flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4">
          <p className="text-sm shrink-0">Auth Type:</p>
          <ButtonLikeDiv
            variant={"secondary"}
            className="capitalize"
            size={"sm"}
          >
            {authType}
          </ButtonLikeDiv>
        </div>
        <ScrollArea
          className={cn("w-full flex-1 min-h-0 py-2 [&>div>div]:h-full")}
        >
          {!type || type === "no-auth" ? (
            <NoAuth />
          ) : (
            <BorderedWrapper>
              {type === "basic-auth" && (
                <BasicAuth
                  disabled
                  authData={basicAuth ?? DEFAULT_BASIC_AUTH}
                />
              )}
              {type === "bearer-token" && (
                <BearerToken disabled authData={bearerAuth ?? ""} />
              )}
              {type === "jwt-bearer" && (
                <JWTBearer
                  disabled
                  authData={jwtAuth ?? DEFAULT_JWT_BEARER_AUTH}
                />
              )}
              {type === "api-key" && (
                <APIKey disabled authData={apiKeyAuth ?? DEFAULT_API_KEY} />
              )}
            </BorderedWrapper>
          )}
        </ScrollArea>
      </div>
    </ScrollArea>
  );
});

export default Authorization;
