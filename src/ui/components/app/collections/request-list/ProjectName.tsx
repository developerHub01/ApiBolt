import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProject } from "@/context/redux/request-response/selectors/project";

const ProjectName = () => {
  const activeProject = useAppSelector(selectActiveProject);

  if (!activeProject) return null;
  const { name } = activeProject;

  return (
    <p className="outline-none uppercase w-full font-bold select-none text-sm truncate overflow-hidden">
      {name}
    </p>
  );
};

export default ProjectName;
