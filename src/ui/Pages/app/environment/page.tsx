import EnvironmentVariables from "@/components/app/environment/environemnt-variables/EnvironmentVariables";
import EnvironmentTop from "@/components/app/environment/environment-top/EnvironmentTop";

const EnvironmentPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <EnvironmentTop />
      <EnvironmentVariables />
    </div>
  );
};

export default EnvironmentPage;
