import { memo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLocalPassword } from "@/context/local-password/LocalPasswordProvider";
import { cn } from "@/lib/utils";
import { disableLocalPassword } from "@/context/redux/local-password/thunks/local-password";
import { useAppDispatch } from "@/context/redux/hooks";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import { handleChangeIsLocalPasswordOpen } from "@/context/redux/local-password/local-password-slice";

const LocalPasswordDisableAlert = memo(() => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const { isDisableRequest, handleChangeDisableRequest } = useLocalPassword();

  const handleDisable = async () => {
    const response = await dispatch(disableLocalPassword()).unwrap();
    toast({
      type: response ? "success" : "error",
      title: response ? "Disabled" : "Failed",
      description: response
        ? "Password based startup disabled successfully."
        : "Couldn't update password.",
    });
    handleChangeDisableRequest(false);
    dispatch(handleChangeIsLocalPasswordOpen(false));
  };

  return (
    <AlertDialog open={isDisableRequest}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Disable Password</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to disable password? Once disable anyone can
            open the app from your device. You can enable again after that.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant={"secondary"}
              onClick={() => handleChangeDisableRequest(false)}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDisable}
              className={cn(
                "text-foreground bg-red-500",
                "hover:text-foreground hover:bg-red-700",
              )}
            >
              Disable
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default LocalPasswordDisableAlert;
