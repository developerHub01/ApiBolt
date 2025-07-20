import ProjectMenuProvider from "@/context/collections/project/ProjectMenuProvider";
import { Outlet } from "react-router-dom";

const ProjectsLayout = () => {
  return (
    <section className="w-full h-full overflow-hidden flex flex-col p-4">
      <ProjectMenuProvider>
        <Outlet />
      </ProjectMenuProvider>
    </section>
  );
};

export default ProjectsLayout;
