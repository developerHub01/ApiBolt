import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AuthContent from "@/components/app/authorization/content/AuthContent";
import AuthTypeTab from "@/components/app/authorization/AuthTypeTab";
import AuthDetails from "@/components/app/authorization/AuthDetails";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";

const RequestAuthorization = memo(() => {
  const selectedTab = useAppSelector(selectSelectedTab);
  if (!selectedTab) return null;

  return (
    <>
      <p className="text-foreground text-sm select-none">Authorization</p>
      <ScrollArea className="w-full flex-1 border-t py-3 overflow-visible min-h-0 h-full [&>div>div]:h-full shrink-0 flex flex-col gap-3">
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex flex-col gap-1.5 pb-3">
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm shrink-0">Auth Type:</p>
              <AuthTypeTab id={selectedTab} />
            </div>
            <AuthDetails id={selectedTab} />
          </div>
          <Separator orientation="horizontal" className="w-full" />
          <AuthContent className="py-3" id={selectedTab} />
        </div>
      </ScrollArea>
    </>
  );
});

export default RequestAuthorization;
