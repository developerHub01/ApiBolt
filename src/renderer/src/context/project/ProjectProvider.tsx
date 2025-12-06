import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { ProjectInterface } from "@shared/types/project.types";
import {
  changeActiveProject,
  deleteProject,
} from "@/context/redux/project/thunks/projects";

interface ProjectContext {
  projectList: Array<ProjectInterface>;
  isCreateDialogOpen: boolean;
  handleChangeActiveProject: (value: string) => void;
  handleChangeIsCreateDialogOpen: (value?: boolean) => void;
  handleSearchProjects: (term: string) => void;
  deletionCandidate?: string | null;
  handleChangeDeletionCandidate: (value?: string | null) => void;
  handleDeleteProject: () => Promise<boolean>;
}

const ProjectContext = createContext<ProjectContext | null>(null);

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider.");
  }

  return context;
};

interface ProjectProviderProps {
  children: React.ReactNode;
}

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const dispatch = useAppDispatch();
  const projectListFromStore = useAppSelector(
    state => state.project.projectList,
  );

  const [deletionCandidate, setDeletionCandidate] = useState<string | null>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<Array<ProjectInterface>>([]);

  const handleChangeActiveProject = useCallback(
    (value: string) => {
      dispatch(changeActiveProject(value));
    },
    [dispatch],
  );

  const handleChangeIsCreateDialogOpen = useCallback((value?: boolean) => {
    setIsCreateDialogOpen(prev => (value === undefined ? !prev : value));
  }, []);

  useEffect(() => {
    setProjectList(projectListFromStore);
  }, [projectListFromStore]);

  const handleSearchProjects = useCallback(
    (term: string) => {
      if (!term) return setProjectList(projectListFromStore);

      setProjectList(prev =>
        prev.filter(project =>
          project.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    },
    [projectListFromStore],
  );

  const handleChangeDeletionCandidate = useCallback(
    (value?: string | null) => setDeletionCandidate(value ?? null),
    [],
  );

  const handleDeleteProject = useCallback(async (): Promise<boolean> => {
    if (!deletionCandidate) return false;
    return await dispatch(deleteProject(deletionCandidate)).unwrap();
  }, [deletionCandidate, dispatch]);

  return (
    <ProjectContext.Provider
      value={{
        projectList,
        handleChangeActiveProject,
        isCreateDialogOpen,
        handleChangeIsCreateDialogOpen,
        handleSearchProjects,
        deletionCandidate,
        handleChangeDeletionCandidate,
        handleDeleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
