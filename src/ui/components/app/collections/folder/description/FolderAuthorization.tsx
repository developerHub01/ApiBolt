import { memo } from "react";
import AuthTop from "@/components/app/authorization/AuthTop";
import AuthContent from "@/components/app/authorization/content/AuthContent";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedTab } from "@/context/redux/request-response/request-response-selector";

const FolderAuthorization = memo(() => {
  const selectedTab = useAppSelector(selectSelectedTab);
  if (!selectedTab) return null;

  return (
    <div className="w-full h-full p-3 flex flex-col gap-5">
      <AuthTop id={selectedTab} />
      <Separator className="w-full" />
      <AuthContent id={selectedTab} />
    </div>
  );
});

export default FolderAuthorization;
