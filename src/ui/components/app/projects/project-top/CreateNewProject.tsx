import { memo, useCallback } from "react";
import { Plus as AddIcon } from "lucide-react";
import { useProjectMenu } from "@/context/project/ProjectMenuProvider";
import ActionButton from "@/components/app/projects/project-top/ActionButton";

const CreateNewProject = memo(() => {
  const { handleChangeIsCreateDialogOpen } = useProjectMenu();

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
