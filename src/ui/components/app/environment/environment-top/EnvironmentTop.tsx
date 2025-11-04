import EnvironmentSearch from "@/components/app/environment/environment-top/EnvironmentSearch";
import PageHeader from "@/components/ui/page-header";
import ThreeeDotAction from "@/components/app/environment/environment-top/ThreeeDotAction";

const EnvironmentTop = () => {
  return (
    <div className="w-full flex flex-col p-2.5">
      <div className="flex justify-between items-center gap-2 pb-3.5">
        <PageHeader className="pb-0">Environment Variables</PageHeader>
        <ThreeeDotAction />
      </div>
      <EnvironmentSearch />
    </div>
  );
};

export default EnvironmentTop;
