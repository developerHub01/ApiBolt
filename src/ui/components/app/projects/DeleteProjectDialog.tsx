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
import { toast } from "sonner";
import LoaderV1 from "@/components/LoaderV1";
import { useAppSelector } from "@/context/redux/hooks";
import {
  AnimatedDialog,
  AnimatedDialogBottom,
  AnimatedDialogContentWrapper,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import { useProject } from "@/context/project/ProjectProvider";
import { selectProjectById } from "@/context/redux/request-response/request-response-selector";
import { Badge } from "@/components/ui/badge";

const defaultName = "";

const DeleteProjectDialog = memo(() => {
  const {
    deletionCandidate,
    handleChangeDeletionCandidate,
    handleDeleteProject,
  } = useProject();
  const projectDetails = useAppSelector(selectProjectById(deletionCandidate));
  const projectName = projectDetails?.name;
  const [name, setName] = useState<string>(defaultName);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    handleChangeDeletionCandidate();
    setIsLoading(false);
    setName(defaultName);
  }, [handleChangeDeletionCandidate]);

  const handleDelete = useCallback(async () => {
    if (name.trim() !== projectName) return;

    setIsLoading(true);
    const response = await handleDeleteProject();
    setIsLoading(false);
    setName(defaultName);

    if (response) handleClose();
    toast(response ? "Project Deleted Successfully!" : "Something went wrong!");
  }, [handleClose, handleDeleteProject, name, projectName]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleDelete();
      }
    },
    [handleDelete]
  );

  if (!projectName) return;

  const isDisabled = isLoading || !name.trim() || name.trim() !== projectName;

  return (
    <AnimatedDialog isOpen={Boolean(deletionCandidate)} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="border max-h-[350px] max-w-[450px] md:max-w-[500px]">
        <AnimatedDialogTop className="flex flex-col gap-3 px-4 py-3">
          <h3 className="text-lg leading-none font-semibold">Delete Project</h3>
          <p className="text-muted-foreground text-sm">
            To delete project type{" "}
            <Badge variant={"outline"} className="select-text">
              {projectName}
            </Badge>
          </p>
        </AnimatedDialogTop>
        <div className="flex-1 flex flex-col gap-3 px-4 py-5">
          <Label htmlFor="project-name" className="font-normal text-sm">
            Project Name
          </Label>
          <Input
            id="project-name"
            name="project-name"
            placeholder={projectName}
            value={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        <AnimatedDialogBottom className="justify-end gap-3 px-4 py-3">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isDisabled}
          >
            Delete
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

export default DeleteProjectDialog;
