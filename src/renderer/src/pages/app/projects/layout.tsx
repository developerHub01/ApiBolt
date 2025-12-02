import AddProjectDialog from "@/components/app/projects/AddProjectDialog";
import DeleteProjectDialog from "@/components/app/projects/DeleteProjectDialog";
import ProjectProvider from "@/context/project/ProjectProvider";
import { Outlet } from "react-router-dom";

const ProjectsLayout = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col p-4 justify-center items-center relative">
      <ProjectProvider>
        <Outlet />
        <AddProjectDialog />
        <DeleteProjectDialog />
      </ProjectProvider>
    </section>
  );
};

export default ProjectsLayout;
