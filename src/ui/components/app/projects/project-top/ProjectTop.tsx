import CreateNewProject from "@/components/app/projects/project-top/CreateNewProject";
import PageHeader from "@/components/ui/page-header";

const ProjectTop = () => {
  return (
    <div className="flex justify-between flex-wrap gap-4 pb-3">
      <div className="w-full md:max-w-[450px] flex-1">
        <PageHeader>All Projects</PageHeader>
        <p className="text-muted-foreground text-sm">
          Here is the list of projects that you can access or can create new and
          manage
        </p>
      </div>
      <CreateNewProject />
    </div>
  );
};

export default ProjectTop;
