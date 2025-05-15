import { Button } from "@/components/ui/button";
import { Plus as PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRequestList } from "@/context/request-list/RequestListProvider";

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
  const { createCollection, createSingleRequest } = useRequestList();
  const handleAction = (id: TAction) => {
    switch (id) {
      case "single_request":
        return createSingleRequest();
      case "blank_collection":
        return createCollection();
    }
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
