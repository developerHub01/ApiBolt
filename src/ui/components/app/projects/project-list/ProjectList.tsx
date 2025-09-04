import ProjectItem from "@/components/app/projects/project-list/ProjectItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/context/redux/hooks";
import Empty from "@/components/ui/empty";
import { useProject } from "@/context/project/ProjectProvider";

const ProjectList = () => {
  const projectListFromStore = useAppSelector(
    (state) => state.requestResponse.projectList
  );
  const { projectList } = useProject();
  const activeProjectId = useAppSelector(
    (state) => state.requestResponse.activeProjectId
  );

  return (
    <div className="w-full h-full flex-1 min-h-0">
      <ScrollArea className="w-full min-h-0 h-full overflow-x-hidden [&>div>div]:h-full">
        {/* if no project exist */}
        {!projectListFromStore.length ? (
          <Empty
            label="No project available. Create one."
            description="Your currently have no projects. You can start by clicking on the '+ Create New Variable' button."
            showFallback
            className="min-h-14"
          />
        ) : /* if no search result */
        !projectList?.length ? (
          <Empty
            label="No item matched"
            animationSrc="./lottie/no-search-item-available.lottie"
            showFallback
            fallbackClassName="w-40 h-40 md:w-56 md:h-56"
          />
        ) : (
          /* else where show the list */
          <div className="h-full flex flex-col gap-3 p-0.5">
            {projectList.map((project) => (
              <ProjectItem
                key={project.id}
                {...project}
                activeProjectId={activeProjectId}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ProjectList;
