import { useProjectMenu } from "@/context/project/ProjectMenuProvider";
import ProjectItem from "@/components/app/projects/project-list/ProjectItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import Empty from "@/components/ui/empty";

const ProjectList = () => {
  const projectListFromStore = useAppSelector(
    (state) => state.requestResponse.projectList
  );
  const { projectList } = useProjectMenu();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );

  if (!projectListFromStore.length)
    return (
      <Empty
        label="No project available. Create one."
        description="Your currently have no projects. You can start by clicking on the '+ Create New Variable' button."
        showFallback
      />
    );

  if (!projectList?.length)
    return (
      <Empty
        label="No item matched"
        animationSrc="./lottie/no-search-item-available.lottie"
        showFallback
        fallbackClassName="w-56"
      />
    );

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
