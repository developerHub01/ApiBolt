import {
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus as AddIcon } from "lucide-react";
import { useProjectMenu } from "@/context/project-menu/ProjectMenuProvider";
import { toast } from "sonner";
import LoaderV1 from "@/components/LoaderV1";
import { cn } from "@/lib/utils";
import ActionButton from "@/components/app/projects/project-top/ActionButton";

const defaultName = "New Project";

const CreateNewProject = memo(() => {
  const { isCreateDialogOpen, handleChangeIsCreateDialogOpen } =
    useProjectMenu();
  const [name, setName] = useState<string>(defaultName);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = useCallback(async () => {
    setIsLoading(true);
    const response = await window.electronAPIProjectsDB.createProjects({
      name,
    });
    setIsLoading(false);

    if (response) handleChangeIsCreateDialogOpen();
    toast(response ? "Project Created Successfully!" : "Something went wrong!");
  }, [handleChangeIsCreateDialogOpen, name]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleCreate();
      }
    },
    [handleCreate]
  );
  const handleClose = useCallback(() => {
    handleChangeIsCreateDialogOpen(true);
    setIsLoading(false);
    setName(defaultName);
  }, [handleChangeIsCreateDialogOpen]);

  const isDisabled = isLoading || !name;

  return (
    <Dialog
      open={isCreateDialogOpen}
      onOpenChange={handleChangeIsCreateDialogOpen}
    >
      <DialogTrigger asChild>
        <ActionButton
          label="Create New Project"
          Icon={AddIcon}
          onClick={handleClose}
          className="w-fit"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Create new project here </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Label htmlFor="name-1" className="font-normal text-sm">
            Project Name
          </Label>
          <Input
            id="name-1"
            name="name"
            placeholder="Project name..."
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        <DialogFooter>
          <DialogClose
            className={cn("pointer-events-auto", {
              "pointer-events-none": isDisabled,
            })}
          >
            <Button
              variant="outline"
              disabled={isDisabled}
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleCreate} disabled={isDisabled}>
            Create
          </Button>
        </DialogFooter>
        <Loader isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
});

interface LoaderProps {
  isLoading: boolean;
}
const Loader = memo(({ isLoading }: LoaderProps) => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <LoaderV1 isLoading={isLoading} key="create-new-project-loader" />
    </div>
  );
});

export default CreateNewProject;
