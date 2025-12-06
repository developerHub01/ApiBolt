import { Fragment, memo, useCallback } from "react";
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
import { importRequest } from "@/context/redux/request-response/thunks/request";
import useCustomToast from "@/hooks/ui/use-custom-toast";

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
  const toast = useCustomToast();

  const handleAction = useCallback(
    async (id: TAction) => {
      switch (id) {
        case "single_request": {
          const response = await dispatch(createSingleRequest()).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response ? "Add success" : "Add error",
            description: response
              ? "Request added successfully"
              : "Couldn't add request, something went wrong.",
          });
        }
        case "blank_collection": {
          const response = await dispatch(createCollection()).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response ? "Add success" : "Add error",
            description: response
              ? "Request collection added successfully"
              : "Couldn't add request, collection something went wrong.",
          });
        }
        case "rest_api_basics": {
          const response = await dispatch(createRestApiBasic()).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response ? "Add success" : "Add error",
            description: response
              ? "Request folder added successfully"
              : "Couldn't add request folder, something went wrong.",
          });
        }
        case "import_folder": {
          const { success, message } = await dispatch(importRequest()).unwrap();
          toast({
            type: success ? "success" : "error",
            title: success ? "Import success" : "Import error",
            description: message,
          });
          return;
        }
      }
    },
    [dispatch, toast],
  );

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
          {Object.entries(actionsList).map(([typeId, list], index, arr) => (
            <Fragment key={typeId}>
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
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default AddAction;
