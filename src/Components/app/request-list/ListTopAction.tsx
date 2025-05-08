import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus as PlusIcon } from "lucide-react";

const ListTopAction = () => {
  return (
    <div className="flex items-center-safe gap-1 p-2.5">
      <Button size={"iconSm"}>
        <PlusIcon />
      </Button>
      <Input />
    </div>
  );
};

export default ListTopAction;