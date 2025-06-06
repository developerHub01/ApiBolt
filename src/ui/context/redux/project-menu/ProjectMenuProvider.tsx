import React, { createContext, useCallback, useContext, useState } from "react";

interface ProjectMenuContext {
  isMenuOpen: boolean;
  activeProject: string | null;
  isCreateDialogOpen: boolean;
  handleChangeMenuOpen: (value?: boolean) => void;
  handleChangeActiveProject: (value?: string) => void;
  handleChangeIsCreateDialogOpen: (value?: boolean) => void;
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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);

  const handleChangeMenuOpen = useCallback((value?: boolean) => {
    setIsMenuOpen((prev) => (value === undefined ? !prev : value));
  }, []);

  const handleChangeActiveProject = useCallback((value?: string) => {
    setActiveProject(value ?? null);
  }, []);

  const handleChangeIsCreateDialogOpen = useCallback((value?: boolean) => {
    setIsCreateDialogOpen((prev) => (value === undefined ? !prev : value));
  }, []);

  return (
    <ProjectMenuContext.Provider
      value={{
        isMenuOpen,
        activeProject,
        handleChangeMenuOpen,
        handleChangeActiveProject,
        isCreateDialogOpen,
        handleChangeIsCreateDialogOpen,
      }}
    >
      {children}
    </ProjectMenuContext.Provider>
  );
};

export default ProjectMenuProvider;
