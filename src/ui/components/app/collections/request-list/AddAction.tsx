import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus as PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  createCollection,
  createRestApiBasic,
  createSingleRequest,
} from "@/context/redux/request-response/thunks/request-list";
import { toast } from "sonner";
import { importRequest } from "@/context/redux/request-response/thunks/request";

type TAction =
  | "blank_collection"
  | "single_request"
  | "rest_api_basics"
  | "import_folder";

const actionsList: Record<
  string,
  Array<{
    id: TAction;
    label: string;
  }>
> = {
  add: [
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
  ],
  import: [
    {
      id: "import_folder",
      label: "Import Request Folder",
    },
  ],
};

const AddAction = memo(() => {
  const dispatch = useAppDispatch();

  const handleAction = async (id: TAction) => {
    switch (id) {
      case "single_request":
        return dispatch(createSingleRequest());
      case "blank_collection":
        return dispatch(createCollection());
      case "rest_api_basics":
        return dispatch(createRestApiBasic());
      case "import_folder": {
        const { success, message } = await dispatch(importRequest()).unwrap();
        if (success) toast.success(message);
        else toast.error(message);
        return;
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"iconSm"} variant={"ghost"}>
          <PlusIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-0 w-fit min-w-40 flex flex-col [&>button]:justify-start"
        align="end"
        sideOffset={10}
      >
        <DropdownMenuGroup>
          {Object.values(actionsList).map((list, index, arr) => (
            <>
              {list.map(({ id, label }) => (
                <DropdownMenuItem
                  key={id}
                  className="cursor-pointer"
                  onClick={() => handleAction(id)}
                >
                  {label}
                </DropdownMenuItem>
              ))}
              {index !== arr.length - 1 && <DropdownMenuSeparator />}
            </>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default AddAction;
