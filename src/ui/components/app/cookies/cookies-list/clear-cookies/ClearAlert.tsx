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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ClearAlert = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const handleClear = () => {
    dispatch(clearCookies());
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
                "hover:text-foreground hover:bg-red-700"
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
