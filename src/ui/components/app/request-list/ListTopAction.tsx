import { Input } from "@/components/ui/input";
import AddAction from "@/components/app/request-list/AddAction";

const ListTopAction = () => {
  return (
    <div className="flex items-center-safe gap-1 p-2">
      <AddAction />
      <Input />
    </div>
  );
};

export default ListTopAction;
