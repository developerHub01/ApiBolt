import { useMemo } from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AUTH_LIST, INHERIT_AUTH } from "@/constant/authorization.constant";
import { selectHistoryDetails } from "@/context/redux/history/selectors/history";
import { useAppSelector } from "@/context/redux/hooks";

const Authorization = () => {
  const { authorization } = useAppSelector(selectHistoryDetails);

  const authType = useMemo(
    () =>
      (
        AUTH_LIST.find((item) => item.id === authorization?.type) ??
        INHERIT_AUTH
      ).label,
    [authorization?.type]
  );

  console.log(authorization);

  if (!authorization) return;

  return (
    <>
      <p className="text-foreground text-sm select-none">Authorization</p>
      <ScrollArea className="w-full flex-1 border-t py-3 overflow-visible min-h-0 h-full [&>div>div]:h-full shrink-0 flex flex-col gap-3">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-1.5 pb-3">
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm shrink-0">Auth Type:</p>
              <ButtonLikeDiv variant={"secondary"}>{authType}</ButtonLikeDiv>
            </div>
            {/* <AuthDetails id={selectedTab} /> */}
          </div>
          <Separator orientation="horizontal" className="w-full" />
          {/* <AuthContent className="py-3" id={selectedTab} /> */}
        </div>
      </ScrollArea>
    </>
  );
};

export default Authorization;
