import { Button } from "@/components/ui/button";
import { Plus as PlusIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const actionsList = [
  {
    id: "clank_collection",
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"iconSm"}>
          <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-40 p-0 flex flex-col [&>button]:rounded-none [&>button]:justify-start"
        align="start"
        sideOffset={10}
      >
        {actionsList.map(({ id, label }) => (
          <Button key={id} variant={"ghost"}>
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default AddAction;
