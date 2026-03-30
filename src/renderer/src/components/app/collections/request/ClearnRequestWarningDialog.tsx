import { memo, useState } from "react";
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
import useCustomToast from "@/hooks/ui/use-custom-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { clearRequest } from "@/context/redux/request-response/thunks/request";
import { handleChangeIsClearingRequestOrFolderId } from "@/context/redux/request-response/request-response-slice";

const ClearnRequestWarningDialog = memo(() => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const [doClearTestScript, setDoClearTestScript] = useState<boolean>(false);

  const isClearingRequestOrFolderId = useAppSelector(
    state => state.requestResponse.isClearingRequestOrFolderId,
  );
  const folderOrRequestName = useAppSelector(
    state =>
      state.requestResponse.requestList[
        state.requestResponse.isClearingRequestOrFolderId!
      ]?.name ?? "",
  );

  const requestType = useAppSelector(state =>
    state.requestResponse.requestList[
      state.requestResponse.isClearingRequestOrFolderId!
    ]?.method
      ? "request"
      : "folder",
  );

  const handleToggleDoClearTestScript = () =>
    setDoClearTestScript(prev => !prev);

  const handleClear = async () => {
    const response = await dispatch(clearRequest()).unwrap();
    toast({
      type: response ? "success" : "error",
      title: response ? "Clear success" : "Clear error",
      description: response
        ? "Request cleared successfully"
        : "Couldn't cleared request, something went wrong.",
    });
    handleClose();
  };

  const handleClose = () => dispatch(handleChangeIsClearingRequestOrFolderId());

  const isOpen = Boolean(isClearingRequestOrFolderId);

  if (!isOpen) {
    if (doClearTestScript) setDoClearTestScript(false);
    return null;
  }

  return (
    <AlertDialog open={Boolean(isClearingRequestOrFolderId)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Clear {`"${folderOrRequestName}"`}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to clear {folderOrRequestName}?
          </AlertDialogDescription>
          {requestType === "request" && (
            <div className="flex items-center gap-2 pt-2.5">
              <Checkbox
                id="clear-test-script"
                name="clear-test-script"
                checked={doClearTestScript}
                onCheckedChange={handleToggleDoClearTestScript}
              />
              <Label
                htmlFor="clear-test-script"
                className="font-normal     text-muted-foreground    "
              >
                Also clear test script
              </Label>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"secondary"} onClick={handleClose}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleClear}
              className={cn(
                "text-foreground bg-red-500",
                "hover:text-foreground hover:bg-red-700",
              )}
            >
              Clear
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default ClearnRequestWarningDialog;
