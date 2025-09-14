import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AuthContent from "@/components/app/authorization/content/AuthContent";
import AuthTypeTab from "@/components/app/authorization/AuthTypeTab";
import AuthDetails from "@/components/app/authorization/AuthDetails";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedTab } from "@/context/redux/request-response/request-response-selector";

const RequestAuthorization = memo(() => {
  const selectedTab = useAppSelector(selectSelectedTab);
  if (!selectedTab) return null;

  return (
    <>
      <p className="text-foreground text-sm select-none">Authorization</p>
      <div className="w-full flex-1 flex h-full min-h-0 gap-3 border-t">
        <ScrollArea className="py-3 w-full max-w-52 overflow-visible min-h-0 h-full [&>div>div]:h-full shrink-0">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-4">
              <p className="text-base shrink-0">Auth Type:</p>
              <AuthTypeTab id={selectedTab} className="w-full" />
            </div>
            <AuthDetails id={selectedTab} />
          </div>
        </ScrollArea>
        <Separator orientation="vertical" className="h-full" />
        <AuthContent className="py-3" id={selectedTab} />
      </div>
    </>
  );
});

export default RequestAuthorization;
