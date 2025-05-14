import EnvironmentSearch from "@/components/app/request-panel/environment/environment-top/EnvironmentSearch";
import EnvironmentTopLeft from "@/components/app/request-panel/environment/environment-top/EnvironmentTopLeft";
import EnvironmentTopRight from "@/components/app/request-panel/environment/environment-top/EnvironmentTopRight";

const EnvironmentTop = () => {
  return (
    <div className="w-full flex flex-col gap-3 p-2.5">
      <div className="flex justify-between items-center gap-2">
        <EnvironmentTopLeft />
        <EnvironmentTopRight />
      </div>
      <EnvironmentSearch />
    </div>
  );
};

export default EnvironmentTop;
