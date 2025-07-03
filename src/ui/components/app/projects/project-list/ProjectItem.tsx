import { useAppDispatch } from "@/context/redux/hooks";
import { changeActiveProject } from "@/context/redux/request-response/request-response-thunk";
import { cn } from "@/lib/utils";

interface ProjectItemProps {
  id: string;
  name: string;
  activeProjectId?: string | null;
}

const ProjectItem = ({ id, name, activeProjectId }: ProjectItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(changeActiveProject(id))}
      id={id}
      className={cn(
        "w-full p-5 rounded-sm bg-accent/20 hover:bg-accent transition-all duration-200 cursor-pointer",
        {
          "ring-2 ring-primary/50": activeProjectId === id,
          "ring-0": activeProjectId !== id,
        }
      )}
    >
      <h3 className="capitalize text-lg font-semibold">{name}</h3>
    </div>
  );
};

export default ProjectItem;
