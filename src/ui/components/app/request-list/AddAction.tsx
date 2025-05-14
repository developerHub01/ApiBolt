import { Button } from "@/components/ui/button";
import { Plus as PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { v4 as uuidv4 } from "uuid";

type TAction = "blank_collection" | "single_request" | "rest_api_basics";

const actionsList: Array<{
  id: TAction;
  label: string;
}> = [
  {
    id: "blank_collection",
    label: "Blank Collection",
  },
  {
    id: "single_request",
    label: "Single Request",
  },
  {
    id: "rest_api_basics",
    label: "REST API Basics",
  },
];

const AddAction = () => {
  const handleAction = (id: TAction) => {
    console.log({ id });

    switch (id) {
      case "single_request":
        return createSingleRequest();
      case "blank_collection":
        return createCollection();
    }
  };

  const createSingleRequest = async () => {
    const payload = {
      id: uuidv4(),
      name: "Request",
      method: "get",
    };

    await window.electronAPIDB.addBoltCore(payload);
  };

  const createCollection = async () => {
    const payload = {
      id: uuidv4(),
      name: "Collection",
      children: [],
    };

    await window.electronAPIDB.addBoltCore(payload);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"iconSm"}>
          <PlusIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        <DropdownMenuGroup>
          {actionsList.map(({ id, label }) => (
            <DropdownMenuItem
              key={id}
              className="cursor-pointer"
              onClick={() => handleAction(id)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddAction;
