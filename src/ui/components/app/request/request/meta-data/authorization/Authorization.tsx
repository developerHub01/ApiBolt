import AuthTypeTab from "@/components/app/request/request/meta-data/authorization/AuthTypeTab";
import AuthContent from "@/components/app/request/request/meta-data/authorization/content/AuthContent";
import AuthDetails from "@/components/app/request/request/meta-data/authorization/AuthDetails";

const Authorization = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-72 h-full border-r pr-2 md:pr-2.5 flex flex-col gap-1.5">
        <p className="text-sm">Auth Type</p>
        <AuthTypeTab />
        <AuthDetails />
      </div>
      <div className="h-full w-full">
        <AuthContent />
      </div>
    </div>
  );
};

export default Authorization;
