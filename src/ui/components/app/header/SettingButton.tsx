import { Settings as SettingIcon } from "lucide-react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ActionButton from "@/components/app/header/ActionButton";

const SettingButton = () => {
  const dispatch = useAppDispatch();
  const handleToggle = () => dispatch(handleChangeIsSettingOpen());

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ActionButton id="settings" onClick={handleToggle}>
          <SettingIcon />
        </ActionButton>
      </TooltipTrigger>
      <TooltipContent>
        <p>Setting (Ctrl+,)</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SettingButton;
