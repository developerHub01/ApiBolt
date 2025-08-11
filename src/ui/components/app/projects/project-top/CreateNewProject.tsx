import { memo, useCallback } from "react";
import { Plus as AddIcon } from "lucide-react";
import ActionButton from "@/components/app/projects/project-top/ActionButton";
import { useProject } from "@/context/project/ProjectProvider";

const CreateNewProject = memo(() => {
  const { handleChangeIsCreateDialogOpen } = useProject();

  const handleClose = useCallback(() => {
    handleChangeIsCreateDialogOpen(true);
  }, [handleChangeIsCreateDialogOpen]);

  return (
    <ActionButton
      label="Create New Project"
      Icon={AddIcon}
      onClick={handleClose}
      className="w-fit"
    />
  );
});

export default CreateNewProject;
