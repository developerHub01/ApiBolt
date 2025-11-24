import AddNewData from "@/components/add-new-data";
import VariableList from "@/components/app/environment/environemnt-variables/VariableList";
import { useAppDispatch } from "@/context/redux/hooks";
import { createEnvironments } from "@/context/redux/environments/thunks/environments";
import { ScrollArea } from "@/components/ui/scroll-area";

const EnvironmentVariables = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <section className="w-full min-h-0 h-full flex-1">
        <ScrollArea className="w-full min-h-0 h-full [&>div>div]:h-full rounded-lg">
          <div className="w-full h-full flex flex-col items-center gap-5">
            <VariableList />
          </div>
        </ScrollArea>
      </section>
      <AddNewData
        onClick={() => dispatch(createEnvironments())}
        label="Add New Variable"
      />
    </>
  );
};

export default EnvironmentVariables;
