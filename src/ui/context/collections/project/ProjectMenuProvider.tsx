import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { changeActiveProject } from "@/context/redux/request-response/request-response-thunk";
import type { ProjectInterface } from "@/context/redux/request-response/request-response-slice";

interface ProjectMenuContext {
  projectList: Array<ProjectInterface>;
  isCreateDialogOpen: boolean;
  handleChangeActiveProject: (value: string) => void;
  handleChangeIsCreateDialogOpen: (value?: boolean) => void;
  handleSearchProjects: (term: string) => void;
}

const ProjectMenuContext = createContext<ProjectMenuContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useProjectMenu = () => {
  const context = useContext(ProjectMenuContext);

  if (!context) {
    throw new Error(
      "useProjectMenu must be used within a ProjectMenuProvider."
    );
  }

  return context;
};

interface ProjectMenuProviderProps {
  children: React.ReactNode;
}

const ProjectMenuProvider = ({ children }: ProjectMenuProviderProps) => {
  const dispatch = useAppDispatch();
  const projectListFromStore = useAppSelector(
    (state) => state.requestResponse.projectList
  );

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<Array<ProjectInterface>>([]);

  const handleChangeActiveProject = useCallback(
    (value: string) => {
      dispatch(changeActiveProject(value));
    },
    [dispatch]
  );

  const handleChangeIsCreateDialogOpen = useCallback((value?: boolean) => {
    setIsCreateDialogOpen((prev) => (value === undefined ? !prev : value));
  }, []);

  useEffect(() => {
    setProjectList(projectListFromStore);
  }, [projectListFromStore]);

  const handleSearchProjects = useCallback(
    (term: string) => {
      if (!term) return setProjectList(projectListFromStore);

      setProjectList((prev) =>
        prev.filter((project) =>
          project.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    },
    [projectListFromStore]
  );

  return (
    <ProjectMenuContext.Provider
      value={{
        projectList,
        handleChangeActiveProject,
        isCreateDialogOpen,
        handleChangeIsCreateDialogOpen,
        handleSearchProjects,
      }}
    >
      {children}
    </ProjectMenuContext.Provider>
  );
};

export default ProjectMenuProvider;
