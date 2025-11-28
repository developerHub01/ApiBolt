import {
  memo,
  useCallback,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderV1 from "@/components/loader-v1";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  AnimatedDialog,
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentWrapper,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import { useProject } from "@/context/project/ProjectProvider";
import {
  DEFAULT_PROJECT_NAME,
  MAX_PROJECT_NAME_LENGTH,
} from "@/constant/project.constant";
import { createProject } from "@/context/redux/project/thunks/projects";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const AddProjectDialog = memo(() => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { isCreateDialogOpen, handleChangeIsCreateDialogOpen } = useProject();
  const [name, setName] = useState<string>(DEFAULT_PROJECT_NAME);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = useCallback(async () => {
    setIsLoading(true);
    const response = await dispatch(createProject(name.trim())).unwrap();
    setIsLoading(false);
    setName(DEFAULT_PROJECT_NAME);

    if (response) handleChangeIsCreateDialogOpen();
    toast({
      type: response ? "success" : "error",
      title: response ? "Paste success" : "Paste error",
      description: response
        ? "Project created successfully"
        : "Failed to create project. Please try again.",
    });
  }, [dispatch, handleChangeIsCreateDialogOpen, name, toast]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length > MAX_PROJECT_NAME_LENGTH) return;
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
    handleChangeIsCreateDialogOpen(false);
    setIsLoading(false);
    setName(DEFAULT_PROJECT_NAME);
  }, [handleChangeIsCreateDialogOpen]);

  const isDisabled = isLoading || !name;

  return (
    <AnimatedDialog isOpen={isCreateDialogOpen} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-h-[350px] max-w-[450px] md:max-w-[500px]">
        <AnimatedDialogTop className="flex flex-col gap-3 px-4 py-3">
          <h3 className="text-lg leading-none font-semibold">
            Create New Project
          </h3>
          <p className="text-muted-foreground text-sm">
            Organize your API requests into a new project
          </p>
        </AnimatedDialogTop>
        <AnimatedDialogContent>
          <div className="flex-1 flex flex-col gap-3 px-4 py-5">
            <Label htmlFor="name-1" className="font-normal text-sm">
              Project Name
              <span className="ml-1 text-xs text-accent-foreground/70 tracking-widest">
                (limit: {name.length}/{MAX_PROJECT_NAME_LENGTH})
              </span>
            </Label>
            <Input
              id="name-1"
              name="name"
              placeholder="Enter project name..."
              value={name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              maxLength={MAX_PROJECT_NAME_LENGTH}
            />
          </div>
        </AnimatedDialogContent>
        <AnimatedDialogBottom className="justify-end gap-3 px-4 py-3">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleCreate} disabled={isDisabled}>
            Create
          </Button>
        </AnimatedDialogBottom>
        <Loader isLoading={isLoading} />
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
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

export default AddProjectDialog;
