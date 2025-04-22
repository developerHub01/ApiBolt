import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus as PlusIcon } from "lucide-react";
import React from "react";

const ListTopAction = () => {
  return (
    <div className="flex items-center-safe gap-1 px-1 py-0.5">
      <Button size={"iconSm"}>
        <PlusIcon />
      </Button>
      <Input />
    </div>
  );
};

export default ListTopAction;
