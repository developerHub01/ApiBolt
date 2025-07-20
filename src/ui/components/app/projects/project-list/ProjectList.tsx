import { useProjectMenu } from "@/context/collections/project/ProjectMenuProvider";
import ProjectItem from "@/components/app/projects/project-list/ProjectItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectNotFound from "@/components/app/projects/project-list/ProjectNotFound";
import { useAppSelector } from "@/context/redux/hooks";

const ProjectList = () => {
  const { projectList } = useProjectMenu();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );

  if (!projectList?.length) return <ProjectNotFound />;

  return (
    <div className="w-full h-full flex-1 min-h-0">
      <ScrollArea className="w-full min-h-0 h-full overflow-x-hidden [&>div>div]:h-full">
        <div className="h-full flex flex-col gap-3 p-0.5">
          {projectList.map((project) => (
            <ProjectItem
              key={project.id}
              {...project}
              activeProjectId={activeProjectId}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProjectList;
