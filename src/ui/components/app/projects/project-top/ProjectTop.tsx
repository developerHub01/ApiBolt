import CreateNewProject from "@/components/app/projects/project-top/CreateNewProject";

const ProjectTop = () => {
  return (
    <div className="flex justify-between flex-wrap gap-4 pb-3">
      <div className="w-full md:max-w-[450px]">
        <h1 className="text-2xl font-bold pb-2">All Projects</h1>
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
