import PageHeader from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import AuthTypeTab from "@/components/app/authorization/AuthTypeTab";
import AuthContent from "@/components/app/authorization/content/AuthContent";
import AuthDetails from "@/components/app/authorization/AuthDetails";

const AuthorizationPage = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-1.5">
        <PageHeader>Authorization</PageHeader>
        <div className="flex items-center gap-4">
          <p className="text-base shrink-0">Auth Type:</p>
          <AuthTypeTab className="min-w-52" />
        </div>
        <AuthDetails />
      </div>
      <Separator className="w-full" />
      <AuthContent />
    </div>
  );
};

export default AuthorizationPage;
