import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AuthTop from "@/components/app/authorization/AuthTop";
import AuthContent from "@/components/app/authorization/content/AuthContent";

const RequestAuthorization = memo(() => {
  return (
    <>
      <p className="text-foreground text-sm select-none">Authorization</p>
      <div className="w-full flex-1 flex h-full min-h-0 gap-3 border-t">
        <ScrollArea className="py-3 w-full max-w-52 md:max-w-60 overflow-visible min-h-0 h-full [&>div>div]:h-full shrink-0">
          <AuthTop className="w-full h-full" />
        </ScrollArea>
        <Separator orientation="vertical" className="h-full" />
        <AuthContent className="py-3" />
      </div>
    </>
  );
});

export default RequestAuthorization;
