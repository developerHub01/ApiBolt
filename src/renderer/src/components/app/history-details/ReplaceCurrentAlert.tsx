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
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { replaceCurrentByHistory } from "@/context/redux/history/thunks/history";
import { useAppDispatch } from "@/context/redux/hooks";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const ReplaceCurrentAlert = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { isReplaceAlertOpen, handleToggleReplaceAlert } = useHistoryDetails();

  const handleReplace = async () => {
    const response = await dispatch(replaceCurrentByHistory()).unwrap();
    if (response) handleToggleReplaceAlert(false);
    toast({
      type: response ? "success" : "error",
      title: response ? "Paste success" : "Paste error",
      description: response
        ? "Request replaced with selected history"
        : "Current request data has been updated.",
    });
  };

  return (
    <AlertDialog open={isReplaceAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Replace current request?</AlertDialogTitle>
          <AlertDialogDescription>
            This will replace the current request body with the data from this
            history entry. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant={"secondary"}
              onClick={() => handleToggleReplaceAlert(false)}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"default"} onClick={handleReplace}>
              Replace
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReplaceCurrentAlert;
