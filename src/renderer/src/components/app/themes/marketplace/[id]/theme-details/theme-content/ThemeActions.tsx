import { useCallback } from "react";
import {
  selectThemeInstallationLoading,
  selectThemeUnInstallationLoading,
} from "@renderer/context/redux/status/selectors/theme-marketplace";
import { Download as InstallIcon, Trash2 as UninstallIcon } from "lucide-react";
import { Spinner } from "@renderer/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@renderer/context/redux/hooks";
import {
  installTheme,
  unInstallTheme,
} from "@renderer/context/redux/theme-marketplace/thunks/theme-marketplace";
import { Button } from "@renderer/components/ui/button";
import { ThemeInterface } from "@shared/types/theme.types";
import { selectSelectedThemeInstallationOrUpdationMeta } from "@renderer/context/redux/theme-marketplace/selectors/theme-marketplace";
import { Separator } from "@renderer/components/ui/separator";
import InfoTooltip from "@renderer/components/ui/InfoTooltip";
import { selectActiveProjectId } from "@renderer/context/redux/project/selectors/project";
import { changeActiveThemeId } from "@renderer/context/redux/theme/thunks/theme";

interface Props extends Pick<ThemeInterface, "id" | "version"> {}

type TAction = "install" | "uninstall" | "update" | "activate";

const ThemeActions = ({ id, version }: Props) => {
  const dispatch = useAppDispatch();
  const projectId = useAppSelector(selectActiveProjectId);
  const isInstalling = useAppSelector(selectThemeInstallationLoading);
  const isUnInstalling = useAppSelector(selectThemeUnInstallationLoading);
  const { isInstalled, needUpdate, oldVersion, isActivable } = useAppSelector(
    selectSelectedThemeInstallationOrUpdationMeta,
  );

  const handleAction = useCallback(
    (type: TAction) => () => {
      if (!id) return;
      switch (type) {
        case "install":
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
          {isActivable && (
            <Button
              type="button"
              size={"sm"}
              variant={"secondary"}
              onClick={handleAction("activate")}
              disabled={isUnInstalling}
            >
              Activate
            </Button>
          )}
          {needUpdate && (
            <Button
              type="button"
              size={"sm"}
              onClick={handleAction("update")}
              disabled={isInstalling || isUnInstalling}
            >
              {isInstalling && <Spinner />}
              Update to new version
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
      <div className="flex gap-2 ml-auto">
        <p className="text-sm">version: {version}</p>
        {needUpdate && (
          <>
            <Separator />
            {oldVersion}
            <InfoTooltip
              label={`A new version of the theme available your old version is ${oldVersion} but new version is ${version}`}
              align="end"
              buttonVariant={"transparent"}
              contentVariant={"outline"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ThemeActions;
