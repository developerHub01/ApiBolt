import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus as PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ListTopAction = () => {
  return (
    <div className="flex items-center-safe gap-1 p-2.5">
      <Link to={"/request/123"}>
        <Button size={"iconSm"}>
          <PlusIcon />
        </Button>
      </Link>
      <Input />
    </div>
  );
};

export default ListTopAction;
