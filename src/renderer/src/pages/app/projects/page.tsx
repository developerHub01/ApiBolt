import ProjectTop from "@/components/app/projects/project-top/ProjectTop";
import ProjectList from "@/components/app/projects/project-list/ProjectList";
import ProjectSearch from "@/components/app/projects/search/ProjectSearch";
import ActiveProject from "@/components/app/projects/ActiveProject";

const ProjectsPage = () => {
  return (
    <section className="w-full h-full max-w-3xl flex justify-center items-center">
      <div className="w-full h-full flex flex-col gap-4 p-5 pb-8 justify-center">
        <ProjectTop />
        <ActiveProject />
        <ProjectSearch />
        <ProjectList />
      </div>
    </section>
  );
};

export default ProjectsPage;
