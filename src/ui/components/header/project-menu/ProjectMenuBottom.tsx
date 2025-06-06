import { Grid2x2 as ProjectsIcon } from "lucide-react";
import ActionButton from "@/components/header/project-menu/ActionButton";
import CreateNewProject from "@/components/header/project-menu/CreateNewProject";

const ProjectMenuBottom = () => {
  return (
    <div>
      <CreateNewProject />
      <ActionButton link="/" label="View All Projects" Icon={ProjectsIcon} />
    </div>
  );
};

export default ProjectMenuBottom;
