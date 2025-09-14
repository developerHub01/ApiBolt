import PageHeader from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import AuthContent from "@/components/app/authorization/content/AuthContent";
import AuthTop from "@/components/app/authorization/AuthTop";
import { defaultAuthorizationId } from "@/constant/authorization.constant";

const AuthorizationPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-1.5">
        <PageHeader>Authorization</PageHeader>
        <AuthTop id={defaultAuthorizationId} />
      </div>
      <Separator className="w-full" />
      <AuthContent id={defaultAuthorizationId} />
    </div>
  );
};

export default AuthorizationPage;
