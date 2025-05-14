import EnvironmentVariables from "@/components/app/request-panel/environment/environemnt-variables/EnvironmentVariables";
import EnvironmentTop from "@/components/app/request-panel/environment/environment-top/EnvironmentTop";

const EnvironmentPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <EnvironmentTop />
      <EnvironmentVariables />
    </div>
  );
};

export default EnvironmentPage;
