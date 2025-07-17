import Authorization from "@/components/app/authorization/Authorization";
import PageHeader from "@/components/ui/page-header";

const AuthorizationPage = () => {
  return (
    <div className="flex flex-col w-full h-full max-w-4xl mx-auto">
      <PageHeader>Authorization</PageHeader>
      <Authorization />
    </div>
  );
};

export default AuthorizationPage;
