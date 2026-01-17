import { memo } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectIsInstallMaxCountAlertOpen } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeIsInstallMaxCountAlertOpen } from "@/context/redux/theme-marketplace/theme-marketplace-slice";

const ThemeInstallMaxSizeAlert = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsInstallMaxCountAlertOpen);

  const handleClose = () =>
    dispatch(handleChangeIsInstallMaxCountAlertOpen(false));

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Installation limit exit</AlertDialogTitle>
          <AlertDialogDescription>
            You reached the max limit of theme install. Delete some themes to
            install new. You can install at most 6 in your local machine.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"default"} onClick={handleClose}>
              Ok
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default ThemeInstallMaxSizeAlert;
