import { useMemo } from "react";
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
import { useRequestList } from "@/context/request-list/RequestListProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RequestListDeleteAlertDialog = () => {
  const { listData, deleteFolderOrRequestId, handleDeleteFolderOrRequest } =
    useRequestList();

  const folderOrRequestName = useMemo(
    () => listData[deleteFolderOrRequestId]?.name ?? "",
    [listData, deleteFolderOrRequestId]
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
              onClick={() => handleDeleteFolderOrRequest(false)}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => handleDeleteFolderOrRequest(true)}
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
};

export default RequestListDeleteAlertDialog;
