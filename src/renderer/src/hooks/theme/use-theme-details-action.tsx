import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectThemeMarketplaceSelectedThemeId } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import {
  installTheme,
  togglePreviewTheme,
  unInstallTheme,
} from "@/context/redux/theme-marketplace/thunks/theme-marketplace";
import {
  changeActiveThemeId,
  inActiveTheme,
} from "@/context/redux/theme/thunks/theme";

export type TAction =
  | "install"
  | "uninstall"
  | "update"
  | "activate"
  | "in-activate"
  | "preview";

const useThemeDetailsAction = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const projectId = useAppSelector(selectActiveProjectId);
  const id = useAppSelector(selectThemeMarketplaceSelectedThemeId);

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
            title: response
              ? "Uninstalled successfully"
              : "Uninstallation failed",
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

  return handleAction;
};

export default useThemeDetailsAction;
