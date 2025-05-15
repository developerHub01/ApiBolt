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
          <AlertDialogCancel onClick={() => handleDeleteFolderOrRequest(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteFolderOrRequest(true)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RequestListDeleteAlertDialog;
