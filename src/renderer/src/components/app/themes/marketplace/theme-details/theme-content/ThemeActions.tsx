import {
  selectThemeActivatingLoading,
  selectThemeInActivatingLoading,
  selectThemeInstallationLoading,
  selectThemeMarketplaceThemeDetailsHaveError,
  selectThemeUnInstallationLoading,
} from "@/context/redux/status/selectors/theme-marketplace";
import {
  InfoIcon,
  Download as InstallIcon,
  Trash2 as UninstallIcon,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/context/redux/hooks";
import { Button } from "@/components/ui/button";
import { ThemeInterface } from "@shared/types/theme.types";
import { selectSelectedThemeInstallationOrUpdationMeta } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import InfoTooltip from "@/components/ui/InfoTooltip";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { selectIsThemePreviewModeOn } from "@/context/redux/theme/selectors/theme";
import useThemeDetailsAction from "@/hooks/theme/use-theme-details-action";

interface Props extends Pick<ThemeInterface, "version"> {}

const ThemeActions = ({ version }: Props) => {
  const isInstalling = useAppSelector(selectThemeInstallationLoading);
  const isUnInstalling = useAppSelector(selectThemeUnInstallationLoading);
  const isActivating = useAppSelector(selectThemeActivatingLoading);
  const isInActivating = useAppSelector(selectThemeInActivatingLoading);
  const {
    isInstalled,
    needUpdate,
    oldVersion,
    isActivable,
    isInActivable,
    isPreviewable,
    unInstallable,
  } = useAppSelector(selectSelectedThemeInstallationOrUpdationMeta);
  const isOnPreviewMode = useAppSelector(selectIsThemePreviewModeOn);

  const handleAction = useThemeDetailsAction();

  return (
    <div className="flex items-center gap-2">
      {isInstalled ? (
        <>
          <OnlyShowWhenNoError>
            {unInstallable && (
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
            )}
          </OnlyShowWhenNoError>
          {isActivable && (
            <Button
              type="button"
              size={"sm"}
              variant={"default"}
              onClick={handleAction("activate")}
              disabled={isUnInstalling}
            >
              {isActivating && <Spinner />}
              Activate
            </Button>
          )}
          {isInActivable && (
            <Button
              type="button"
              size={"sm"}
              variant={"secondary"}
              onClick={handleAction("in-activate")}
              disabled={isUnInstalling}
            >
              {isInActivating && <Spinner />}
              In-activate
            </Button>
          )}
          <OnlyShowWhenNoError>
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
          </OnlyShowWhenNoError>
        </>
      ) : (
        <OnlyShowWhenNoError>
          <Button
            type="button"
            size={"sm"}
            onClick={handleAction("install")}
            disabled={isInstalling}
          >
            {isInstalling ? <Spinner /> : <InstallIcon />}
            Install
          </Button>
        </OnlyShowWhenNoError>
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
        label={
          needUpdate
            ? `A new version of the theme available your current version is ${oldVersion} but new version ${version} is available now`
            : undefined
        }
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
          <OnlyShowWhenNoError>
            {needUpdate && (
              <>
                <span className="w-0.5 h-5 bg-border" />
                <span>{oldVersion}</span>
                <InfoIcon />
              </>
            )}
          </OnlyShowWhenNoError>
        </ButtonLikeDiv>
      </InfoTooltip>
    </div>
  );
};

interface OnlyShowWhenNoErrorProps {
  children: React.ReactNode;
}

const OnlyShowWhenNoError = ({ children }: OnlyShowWhenNoErrorProps) => {
  const haveError = useAppSelector(selectThemeMarketplaceThemeDetailsHaveError);
  if (haveError) return null;
  return children;
};

export default ThemeActions;
