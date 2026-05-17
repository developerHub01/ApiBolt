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

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  handleCancle: () => void;
  handleDelete: () => void;
}

const TreeListItemDeleteAlertDialog = memo(
  ({ isOpen, title, description, handleCancle, handleDelete }: Props) => {
    return (
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {Boolean(title) && <AlertDialogTitle>{title}</AlertDialogTitle>}
            <AlertDialogDescription>
              {Boolean(description) && description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant={"secondary"} onClick={handleCancle}>
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
  },
);

export default TreeListItemDeleteAlertDialog;
