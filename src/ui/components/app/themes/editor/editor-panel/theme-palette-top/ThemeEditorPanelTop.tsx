import { useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  loadThemePalette,
  pasteThemePalette,
  saveThemePalette,
} from "@/context/redux/theme/thunks/theme";
import useCopyThemePalette from "@/hooks/theme/use-copy-theme-palette";
import {
  Copy as CopyIcon,
  ClipboardPaste as PasteIcon,
  CloudDownload as DownloadIcon,
  RotateCcw as ResetIcon,
  ListEnd as IneritFromThemeIcon,
  type LucideIcon,
} from "lucide-react";
import ThemeList from "@/components/app/themes/editor/editor-panel/theme-palette-top/theme-list/ThemeList";
import useCustomToast from "@/hooks/ui/use-custom-toast";

type TAction =
  | "copy"
  | "paste"
  | "download"
  | "reset"
  | "inherit-palette-from-theme";

interface ActionButtonInterface {
  id: TAction;
  Icon: LucideIcon;
  label: string;
}

const ACTION_BUTTON_LIST: Array<ActionButtonInterface> = [
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
    label: "Download clipboard as JSON",
  },
  {
    id: "reset",
    Icon: ResetIcon,
    label: "Reset palette to current theme",
  },
];

const INHERIT_FROM_INSTALLED_THEME: ActionButtonInterface = {
  id: "inherit-palette-from-theme",
  Icon: IneritFromThemeIcon,
  label: "Inherit palette from installed them",
};

const ThemeEditorPanelTop = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const handleCopy = useCopyThemePalette();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id as TAction;

    switch (id) {
      case "copy":
        return await handleCopy();
      case "paste": {
        const { success, message } =
          await dispatch(pasteThemePalette()).unwrap();
        toast({
          type: success ? "success" : "error",
          title: success ? "Paste success" : "Paste error",
          description: message,
        });
        return;
      }
      case "download":
        return await dispatch(saveThemePalette());
      case "reset": {
        const response = await dispatch(loadThemePalette()).unwrap();
        toast({
          type: response ? "success" : "error",
          title: response ? "Paste success" : "Paste error",
          description: response
            ? "Theme palette reset successfully."
            : "Something went wrong. Can't reset.",
        });
        return;
      }
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
        <InheritPaletteButton />
      </ButtonGroup>
    </div>
  );
};

const InheritPaletteButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(Boolean);
  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Tooltip key={INHERIT_FROM_INSTALLED_THEME.id}>
        <TooltipTrigger asChild>
          <Button
            key={INHERIT_FROM_INSTALLED_THEME.id}
            id={INHERIT_FROM_INSTALLED_THEME.id}
            variant={"background"}
            onClick={handleClick}
          >
            <INHERIT_FROM_INSTALLED_THEME.Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" variant={"background"}>
          <p>{INHERIT_FROM_INSTALLED_THEME.label}</p>
        </TooltipContent>
      </Tooltip>
      <ThemeList isOpen={isOpen} onClose={handleClick} />
    </>
  );
};

export default ThemeEditorPanelTop;
