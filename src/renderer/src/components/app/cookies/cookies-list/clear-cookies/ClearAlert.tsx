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
import { clearCookies } from "@/context/redux/cookies/thunks/cookies";
import { useAppDispatch } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";
import useCustomToast from "@renderer/hooks/ui/use-custom-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ClearAlert = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();

  const handleClear = async () => {
    const response = await dispatch(clearCookies()).unwrap();
    toast({
      type: response ? "success" : "error",
      title: response ? "Delete success" : "Delete error",
      description: response
        ? "Cookies cleared successfully"
        : "Couldn't cleared cookies, something went wrong.",
    });
    onClose();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear cookies?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to clear all cookies
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"secondary"} onClick={onClose}>
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
};

export default ClearAlert;
