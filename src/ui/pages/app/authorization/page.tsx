import PageHeader from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import AuthContent from "@/components/app/authorization/content/AuthContent";
import AuthTop from "@/components/app/authorization/AuthTop";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";

const AuthorizationPage = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full max-w-2xl mx-auto p-5">
      <div className="flex flex-col gap-1.5">
        <PageHeader>Authorization</PageHeader>
        <AuthTop id={DEFAULT_AUTHORIZATION_ID} />
      </div>
      <Separator className="w-full" />
      <AuthContent id={DEFAULT_AUTHORIZATION_ID} />
    </div>
  );
};

export default AuthorizationPage;
