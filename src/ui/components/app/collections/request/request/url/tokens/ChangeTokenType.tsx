import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useAppDispatch } from "@/context/redux/hooks";
import { requestUrlUpdateToken } from "@/context/redux/request-url/request-url-thunk";
import { ArrowDownUp as SwitchIcon } from "lucide-react";

interface Props {
  id: string;
  type: "text" | "env";
}

const ChangeTokenType = ({ id, type }: Props) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(
      requestUrlUpdateToken({
        id,
        type: type === "env" ? "text" : "env",
      })
    );
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"secondary"}
          className="rounded-none h-full"
          onClick={handleToggle}
        >
          <SwitchIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        align="center"
        sideOffset={8}
        variant={"secondary"}
      >
        <p>Change into {type === "env" ? "text" : "environment"} type</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ChangeTokenType;
