import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  pasteThemePalette,
  saveThemePalette,
} from "@/context/redux/theme/thunks/theme";
import useCopyThemePalette from "@/hooks/theme/use-copy-theme-palette";
import {
  Copy as CopyIcon,
  ClipboardPaste as PasteIcon,
  CloudDownload as DownloadIcon,
  type LucideIcon,
} from "lucide-react";
import type { MouseEvent } from "react";
import { toast } from "sonner";

type TAction = "copy" | "paste" | "download";

const ACTION_BUTTON_LIST: Array<{
  id: TAction;
  Icon: LucideIcon;
  label: string;
}> = [
  {
    id: "copy",
    Icon: CopyIcon,
    label: "Copy clipboard",
  },
  {
    id: "paste",
    Icon: PasteIcon,
    label: "Paste your clipboard",
  },
  {
    id: "download",
    Icon: DownloadIcon,
    label: "Download Clipboard as JSON",
  },
];

const ThemeEditorPanelTop = () => {
  const dispatch = useAppDispatch();
  const handleCopy = useCopyThemePalette();
  // saveThemePalette;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id as TAction;

    switch (id) {
      case "copy":
        return await handleCopy();
      case "paste": {
        const { success, message } =
          await dispatch(pasteThemePalette()).unwrap();

        if (success) toast.success(message);
        else toast.error(message);
        return;
      }
      case "download":
        return await dispatch(saveThemePalette());
    }
  };

  return (
    <div className="flex justify-end">
      <ButtonGroup
        aria-label="theme editor action buttons"
        className="divide-x divide-accent"
      >
        {ACTION_BUTTON_LIST.map(({ id, Icon, label }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Button
                key={id}
                id={id}
                variant={"background"}
                onClick={handleClick}
              >
                <Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" variant={"background"}>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ThemeEditorPanelTop;
