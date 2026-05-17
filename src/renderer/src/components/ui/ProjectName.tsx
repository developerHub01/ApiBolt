import { ComponentProps } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProject } from "@/context/redux/project/selectors/project";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  title?: string;
}

const ProjectName = ({ title, className = "", ...props }: Props) => {
  const activeProject = useAppSelector(selectActiveProject);

  if (!activeProject?.name) return null;
  const name = title || activeProject.name;

  return (
    <p
      className={cn(
        "outline-none uppercase w-full font-bold select-none text-sm truncate overflow-hidden",
        className,
      )}
      {...props}
    >
      {name}
    </p>
  );
};

export default ProjectName;
