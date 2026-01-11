import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderV1 from "@/components/loader-v1";
import { useAppSelector } from "@/context/redux/hooks";
import {
  AnimatedDialog,
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentWrapper,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import { useProject } from "@/context/project/ProjectProvider";
import CopyButton from "@/components/ui/copy-button";
import { ClipboardCopy as ClipboardCopyIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { selectProjectById } from "@/context/redux/project/selectors/project";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const defaultName = "";

const DeleteProjectDialog = memo(() => {
  const toast = useCustomToast();
  const {
    deletionCandidate,
    handleChangeDeletionCandidate,
    handleDeleteProject,
  } = useProject();
  const projectDetails = useAppSelector(state =>
    selectProjectById(state, deletionCandidate),
  );
  const projectName = projectDetails?.name;
  const [name, setName] = useState<string>(defaultName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    toast({
      type: response ? "success" : "error",
      title: response ? "Paste success" : "Paste error",
      description: response
        ? "Project deleted successfully"
        : "Failed to delete project. Please try again.",
    });
  }, [handleClose, handleDeleteProject, name, projectName, toast]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleChangeName = useCallback((name: string) => {
    setName(name);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleDelete();
      }
    },
    [handleDelete],
  );

  useEffect(() => {
    if (deletionCandidate) inputRef.current?.focus();
  }, [deletionCandidate]);

  if (!projectName) return;

  const isDisabled = isLoading || !name.trim() || name.trim() !== projectName;
  const projectLabel =
    projectName.slice(0, 10) + (projectName.length > 10 ? "..." : "");

  return (
    <AnimatedDialog isOpen={Boolean(deletionCandidate)} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-h-87.5 max-w-112.5 md:max-w-125">
        <AnimatedDialogTop className="flex flex-col gap-2 px-4 pb-4 pt-6">
          <h3 className="text-lg leading-none font-semibold">Delete Project</h3>
          <div className="text-muted-foreground text-sm">
            <span className="pr-1.5">
              To confirm deletion, type the project name:{" "}
            </span>
            <div className="inline-flex items-center gap-1.5">
              <ButtonLikeDiv
                variant={"outline"}
                className="cursor-default px-1 py-0 pointer-events-none h-6"
              >
                {projectLabel}
              </ButtonLikeDiv>
              <CopyButton value={projectName}>
                <ButtonLikeDiv
                  variant={"outline"}
                  className="h-auto size-6 px-1 py-0 has-[>svg]:px-1"
                >
                  <ClipboardCopyIcon />
                </ButtonLikeDiv>
              </CopyButton>
            </div>
          </div>
        </AnimatedDialogTop>
        <AnimatedDialogContent>
          <div className="flex-1 flex flex-col gap-3 px-4 py-5">
            <Label htmlFor="project-name" className="font-normal text-sm">
              Project Name
            </Label>
            <div className="flex gap-2">
              <Input
                id="project-name"
                name="project-name"
                className="w-full flex-1"
                placeholder={projectName}
                value={name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                ref={inputRef}
              />
            </div>
          </div>
        </AnimatedDialogContent>
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
