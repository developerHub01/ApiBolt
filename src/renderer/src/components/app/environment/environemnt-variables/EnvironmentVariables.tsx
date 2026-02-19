import AddNewData from "@/components/add-new-data";
import VariableList from "@/components/app/environment/environemnt-variables/VariableList";
import { useAppDispatch } from "@/context/redux/hooks";
import { createEnvironments } from "@/context/redux/environments/thunks/environments";

const EnvironmentVariables = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <section className="w-full min-h-0 h-full flex-1">
        <VariableList />
      </section>
      <AddNewData
        onClick={() => dispatch(createEnvironments())}
        label="Add New Variable"
      />
    </>
  );
};

export default EnvironmentVariables;
