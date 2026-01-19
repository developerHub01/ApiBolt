import { useCallback } from "react";
import {
  selectThemeActivatingLoading,
  selectThemeInActivatingLoading,
  selectThemeInstallationLoading,
  selectThemeUnInstallationLoading,
} from "@/context/redux/status/selectors/theme-marketplace";
import {
  InfoIcon,
  Download as InstallIcon,
  Trash2 as UninstallIcon,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  installTheme,
  togglePreviewTheme,
  unInstallTheme,
} from "@/context/redux/theme-marketplace/thunks/theme-marketplace";
import { Button } from "@/components/ui/button";
import { ThemeInterface } from "@shared/types/theme.types";
import { selectSelectedThemeInstallationOrUpdationMeta } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import InfoTooltip from "@/components/ui/InfoTooltip";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  changeActiveThemeId,
  inActiveTheme,
} from "@/context/redux/theme/thunks/theme";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { selectIsThemePreviewModeOn } from "@/context/redux/theme/selectors/theme";
import useCustomToast from "@/hooks/ui/use-custom-toast";

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
  const toast = useCustomToast();
  const projectId = useAppSelector(selectActiveProjectId);
  const isInstalling = useAppSelector(selectThemeInstallationLoading);
  const isUnInstalling = useAppSelector(selectThemeUnInstallationLoading);
  const isActivating = useAppSelector(selectThemeActivatingLoading);
  const isInActivating = useAppSelector(selectThemeInActivatingLoading);
  const { isInstalled, needUpdate, oldVersion, isActivable, isPreviewable } =
    useAppSelector(selectSelectedThemeInstallationOrUpdationMeta);
  const isOnPreviewMode = useAppSelector(selectIsThemePreviewModeOn);

  const handleAction = useCallback(
    (type: TAction) => async () => {
      if (!id) return;
      switch (type) {
        case "install": {
          const response = await dispatch(installTheme(id)).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response ? "Installed successfully" : "Installation failed",
          });
        }
        case "update": {
          const response = await dispatch(installTheme(id)).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response ? "Updated successfully" : "Updation failed",
          });
        }
        case "uninstall": {
          const response = await dispatch(unInstallTheme(id)).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response ? "Updated successfully" : "Updation failed",
          });
        }
        case "activate": {
          const response = await dispatch(
            changeActiveThemeId({
              activeTheme: id ?? null,
              projectId: projectId,
            }),
          ).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response ? "Activated successfully" : "Activation failed",
          });
        }
        case "in-activate": {
          const response = await dispatch(inActiveTheme()).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response
              ? "Un-activated successfully"
              : "Un-activation failed",
          });
        }
        case "preview": {
          const response = await dispatch(togglePreviewTheme()).unwrap();
          return toast({
            type: response ? "success" : "error",
            title: response
              ? "Preview toggled successfully"
              : "Preview toggle failed",
            description: response
              ? "theme preview toggled"
              : "something went wrong while toggle theme preview",
          });
        }
      }
    },
    [dispatch, id, projectId, toast],
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
            {(isActivating || isInActivating) && <Spinner />}
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
