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
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { deleteRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const RequestListDeleteAlertDialog = memo(() => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const deleteFolderOrRequestId = useAppSelector(
    state => state.requestResponse.deleteFolderOrRequestId,
  );

  const folderOrRequestName = useAppSelector(
    state =>
      state.requestResponse.requestList[
        state.requestResponse.deleteFolderOrRequestId
      ]?.name ?? "",
  );

  const handleDelete = async () => {
    const response = await dispatch(
      deleteRequestOrFolder(deleteFolderOrRequestId),
    ).unwrap();
    return toast({
      type: response ? "success" : "error",
      title: response ? "Delete success" : "Delete error",
      description: response
        ? "Request deleted successfully"
        : "Couldn't delete request, something went wrong.",
    });
  };

  return (
    <AlertDialog open={Boolean(deleteFolderOrRequestId)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {`"${folderOrRequestName}"`}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {folderOrRequestName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant={"secondary"}
              onClick={() => dispatch(deleteRequestOrFolder(false))}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              className={cn(
                "text-foreground bg-red-500",
                "hover:text-foreground hover:bg-red-700",
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
