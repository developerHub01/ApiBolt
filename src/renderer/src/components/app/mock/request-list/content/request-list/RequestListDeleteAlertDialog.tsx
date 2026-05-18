import { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { deleteRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import TreeView from "@/components/ui/tree-view/TreeView";

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
    <TreeView.ListItemDeleteAlertDialog
      isOpen={Boolean(deleteFolderOrRequestId)}
      handleDelete={handleDelete}
      handleCancle={() => dispatch(deleteRequestOrFolder(false))}
      title={`Delete "${folderOrRequestName}"?`}
      description={`Are you sure you want to delete ${folderOrRequestName}?`}
    />
  );
});

export default RequestListDeleteAlertDialog;
