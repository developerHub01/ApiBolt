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

const ReplaceCurrentAlert = () => {
  const { isReplaceAlertOpen, handleToggleReplaceAlert } = useHistoryDetails();
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
            <Button
              variant={"default"}
              onClick={() => handleToggleReplaceAlert(false)}
            >
              Replace
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReplaceCurrentAlert;
