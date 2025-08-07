import type { CSSProperties } from "react";
import { Settings as SettingIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isElectron } from "@/utils/electron";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SettingButton = () => {
  const dispatch = useAppDispatch();

  const handleToggle = () => dispatch(handleChangeIsSettingOpen());

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"iconSm"}
          variant={"ghost"}
          style={{
            ...(isElectron()
              ? ({
                  appRegion: "no-drag",
                } as CSSProperties)
              : {}),
          }}
          onClick={handleToggle}
        >
          <SettingIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Setting (Ctrl+,)</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SettingButton