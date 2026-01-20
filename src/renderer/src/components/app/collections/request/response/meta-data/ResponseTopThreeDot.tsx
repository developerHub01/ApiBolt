import { memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis as ThreeDotIcon } from "lucide-react";
import {
  clearResponse,
  saveResponse,
} from "@/context/redux/request-response/thunks/response";
import useCustomToast from "@/hooks/ui/use-custom-toast";

type TAction = "save-to-file" | "clear";

const ACTION_LIST: Array<{
  id: TAction;
  label: string;
}> = [
  {
    id: "save-to-file",
    label: "Save response to file",
  },
  {
    id: "clear",
    label: "Clear response",
  },
];

const ResponseTopThreeDot = memo(() => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const response = useAppSelector(selectResponse);

  const handleAction = useCallback(
    (type: TAction) => async () => {
      switch (type) {
        case "save-to-file": {
          const success = await dispatch(saveResponse()).unwrap();
          return toast({
            type: success ? "success" : "error",
            title: success ? "Response saved" : "Save failed",
            description: success
              ? "The response has been saved to a file."
              : "The response could not be saved.",
          });
        }
        case "clear": {
          const success = await dispatch(clearResponse()).unwrap();
          return toast({
            type: success ? "success" : "error",
            title: success ? "Response cleared" : "Clear failed",
            description: success
              ? "The response has been cleared."
              : "The response could not be cleared.",
          });
        }
      }
    },
    [dispatch, toast],
  );

  if (!response) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"iconSm"}>
          <ThreeDotIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit min-w-40 max-w-60"
        align="end"
        side="bottom"
      >
        <DropdownMenuGroup>
          {ACTION_LIST.map(({ id, label }) => (
            <DropdownMenuItem key={id} onClick={handleAction(id)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default ResponseTopThreeDot;
