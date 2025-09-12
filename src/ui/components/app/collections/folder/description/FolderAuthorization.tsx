import { memo } from "react";
import AuthTop from "@/components/app/authorization/AuthTop";
import AuthContent from "@/components/app/authorization/content/AuthContent";
import { Separator } from "@/components/ui/separator";

const FolderAuthorization = memo(() => {
  return (
    <div className="w-full p-3 flex flex-col gap-5">
      <AuthTop />
      <Separator className="w-full" />
      <AuthContent />
    </div>
  );
});

export default FolderAuthorization;
