import AddNewData from "@/components/AddNewData";
import VariableList from "@/components/app/environment/environemnt-variables/VariableList";

const EnvironmentVariables = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-2.5">
      <VariableList />
      <AddNewData onClick={() => {}} label="Add New Variable" />
    </div>
  );
};

export default EnvironmentVariables;
