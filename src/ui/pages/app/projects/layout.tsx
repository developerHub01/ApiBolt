import AddProjectDialog from "@/components/app/projects/AddProjectDialog";
import ProjectMenuProvider from "@/context/project/ProjectMenuProvider";
import { Outlet } from "react-router-dom";

const ProjectsLayout = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col p-4 justify-center items-center relative">
      <ProjectMenuProvider>
        <Outlet />
        <AddProjectDialog />
      </ProjectMenuProvider>
    </section>
  );
};

export default ProjectsLayout;
