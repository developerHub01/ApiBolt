import { useCallback, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { useProject } from "@/context/project/ProjectProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";
import { Trash2 as DeleteIcon } from "lucide-react";
import { changeActiveProject } from "@/context/redux/project/thunks/projects";

interface ProjectItemProps {
  id: string;
  name: string;
  activeProjectId?: string | null;
}

const ProjectItem = ({ id, name, activeProjectId }: ProjectItemProps) => {
  const dispatch = useAppDispatch();
  const { handleChangeDeletionCandidate } = useProject();

  const handleChangeActiveProject = useCallback(() => {
    dispatch(changeActiveProject(id));
  }, [dispatch, id]);

  const handleDeleteActiveProject = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleChangeDeletionCandidate(id);
    },
    [handleChangeDeletionCandidate, id]
  );

  return (
    <div
      onClick={handleChangeActiveProject}
      id={id}
      className={cn(
        "group w-full flex justify-between p-5 rounded-md bg-accent/50 hover:bg-accent/80 transition-all duration-200 cursor-pointer",
        {
          "ring-2 ring-primary/50": activeProjectId === id,
          "ring-0": activeProjectId !== id,
        }
      )}
    >
      <h3 className="capitalize text-lg font-semibold line-clamp-2 leading-relaxed">
        {name}
      </h3>
      <Button
        size={"iconXs"}
        variant={"destructive"}
        className="opacity-0 pointer-events-none transition-opacity duration-100 ease-in group-hover:opacity-100 group-hover:pointer-events-auto"
        onClick={handleDeleteActiveProject}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default ProjectItem;
