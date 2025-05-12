import AuthTypeTab from "@/components/app/request-panel/request/request/meta-data/authorization/AuthTypeTab";
import AuthContent from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContent";

const Authorization = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-72 h-full border-r pr-2 flex flex-col gap-1.5">
        <p className="text-sm">Auth Type</p>
        <AuthTypeTab />
      </div>
      <div className="h-full w-full">
        <AuthContent />
      </div>
    </div>
  );
};

export default Authorization;
