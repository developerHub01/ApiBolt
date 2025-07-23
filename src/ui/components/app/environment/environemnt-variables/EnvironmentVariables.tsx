import AddNewData from "@/components/AddNewData";
import VariableList from "@/components/app/environment/environemnt-variables/VariableList";
import { useAppDispatch } from "@/context/redux/hooks";
import { createEnvironments } from "@/context/redux/request-response/request-response-thunk";
import { ScrollArea } from "@/components/ui/scroll-area";

const EnvironmentVariables = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <ScrollArea className="w-full min-h-0 h-full pb-5">
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 p-2.5">
          <VariableList />
        </div>
      </ScrollArea>
      <AddNewData
        onClick={() => dispatch(createEnvironments())}
        label="Add New Variable"
      />
    </>
  );
};

export default EnvironmentVariables;
