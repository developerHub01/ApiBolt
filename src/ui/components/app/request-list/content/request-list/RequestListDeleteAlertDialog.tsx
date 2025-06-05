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
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { deleteFolderOrRequest } from "@/context/redux/request-response/request-response-thunk";
import { memo } from "react";

const RequestListDeleteAlertDialog = memo(() => {
  const dispatch = useAppDispatch();
  const deleteFolderOrRequestId = useAppSelector(
    (state) => state.requestResponse.deleteFolderOrRequestId
  );

  const folderOrRequestName = useAppSelector(
    (state) =>
      state.requestResponse.requestList[
        state.requestResponse.deleteFolderOrRequestId
      ]?.name ?? ""
  );

  return (
    <AlertDialog open={Boolean(deleteFolderOrRequestId)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{folderOrRequestName}"?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {folderOrRequestName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant={"secondary"}
              onClick={() => dispatch(deleteFolderOrRequest(false))}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => dispatch(deleteFolderOrRequest(true))}
              className={cn(
                "text-foreground bg-red-500",
                "hover:text-foreground hover:bg-red-700"
              )}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default RequestListDeleteAlertDialog;
