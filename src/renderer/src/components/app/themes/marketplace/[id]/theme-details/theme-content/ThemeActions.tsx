import { useCallback } from "react";
import {
  selectThemeInstallationLoading,
  selectThemeUnInstallationLoading,
} from "@renderer/context/redux/status/selectors/theme-marketplace";
import {
  InfoIcon,
  Download as InstallIcon,
  Trash2 as UninstallIcon,
} from "lucide-react";
import { Spinner } from "@renderer/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@renderer/context/redux/hooks";
import {
  installTheme,
  previewTheme,
  unInstallTheme,
} from "@renderer/context/redux/theme-marketplace/thunks/theme-marketplace";
import { Button } from "@renderer/components/ui/button";
import { ThemeInterface } from "@shared/types/theme.types";
import { selectSelectedThemeInstallationOrUpdationMeta } from "@renderer/context/redux/theme-marketplace/selectors/theme-marketplace";
import { Separator } from "@renderer/components/ui/separator";
import InfoTooltip from "@renderer/components/ui/InfoTooltip";
import { selectActiveProjectId } from "@renderer/context/redux/project/selectors/project";
import {
  changeActiveThemeId,
  inActiveTheme,
} from "@renderer/context/redux/theme/thunks/theme";
import { ButtonLikeDiv } from "@renderer/components/ui/button-like-div";
import { handleChangeThemePreviewMode } from "@renderer/context/redux/theme/theme-slice";
import { selectIsThemePreviewModeOn } from "@renderer/context/redux/theme/selectors/theme";

interface Props extends Pick<ThemeInterface, "id" | "version"> {}

type TAction =
  | "install"
  | "uninstall"
  | "update"
  | "activate"
  | "in-activate"
  | "preview";

const ThemeActions = ({ id, version }: Props) => {
  const dispatch = useAppDispatch();
  const projectId = useAppSelector(selectActiveProjectId);
  const isInstalling = useAppSelector(selectThemeInstallationLoading);
  const isUnInstalling = useAppSelector(selectThemeUnInstallationLoading);
  const { isInstalled, needUpdate, oldVersion, isActivable, isPreviewable } =
    useAppSelector(selectSelectedThemeInstallationOrUpdationMeta);
  const isOnPreviewMode = useAppSelector(selectIsThemePreviewModeOn);

  const handleAction = useCallback(
    (type: TAction) => () => {
      if (!id) return;
      switch (type) {
        case "install": {
          dispatch(installTheme(id));
          return;
        }
        case "update": {
          dispatch(installTheme(id));
          return;
        }
        case "uninstall": {
          dispatch(unInstallTheme(id));
          return;
        }
        case "activate": {
          dispatch(
            changeActiveThemeId({
              activeTheme: id ?? null,
              projectId: projectId,
            }),
          );
          return;
        }
        case "in-activate": {
          dispatch(inActiveTheme());
          return;
        }
        case "preview": {
          dispatch(previewTheme());
          return;
        }
      }
    },
    [dispatch, id, projectId],
  );

  return (
    <div className="flex items-center gap-2">
      {isInstalled ? (
        <>
          <Button
            type="button"
            size={"sm"}
            variant={"destructiveSecondary"}
            onClick={handleAction("uninstall")}
            disabled={isUnInstalling}
          >
            {isUnInstalling ? <Spinner /> : <UninstallIcon />}
            Uninstall
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={handleAction(isActivable ? "activate" : "in-activate")}
            disabled={isUnInstalling}
          >
            {isActivable ? "Activate" : "In-activate"}
          </Button>
          {needUpdate && (
            <Button
              type="button"
              size={"sm"}
              onClick={handleAction("update")}
              disabled={isInstalling || isUnInstalling}
            >
              {isInstalling && <Spinner />}
              Update Version
            </Button>
          )}
        </>
      ) : (
        <Button
          type="button"
          size={"sm"}
          onClick={handleAction("install")}
          disabled={isInstalling}
        >
          {isInstalling ? <Spinner /> : <InstallIcon />}
          Install
        </Button>
      )}
      {isPreviewable && (
        <Button
          type="button"
          size={"sm"}
          variant={"outline"}
          onClick={handleAction("preview")}
          disabled={isInstalling || isUnInstalling}
        >
          {isOnPreviewMode ? "Exit Preview" : "Check Preview"}
        </Button>
      )}
      <InfoTooltip
        label={`A new version of the theme available your current version is ${oldVersion} but new version ${version} is available now`}
        align="end"
        buttonVariant={"transparent"}
        contentVariant={"outline"}
        className="px-0 w-auto ml-auto"
        contentClassName="max-w-55"
      >
        <ButtonLikeDiv
          size={"sm"}
          variant={"outline"}
          className="flex items-center gap-2 rounded-full capitalize"
        >
          <p className="text-sm">version: {version}</p>
          {needUpdate && (
            <>
              <span className="w-0.5 h-5 bg-border" />
              <span>{oldVersion}</span>
              <InfoIcon />
            </>
          )}
        </ButtonLikeDiv>
      </InfoTooltip>
    </div>
  );
};

export default ThemeActions;
