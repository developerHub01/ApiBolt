import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon, Download as ImportIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { useProject } from "@/context/project/ProjectProvider";

const ActionButtons = () => {
  const { handleChangeIsCreateDialogOpen } = useProject();

  const handleCreate = useCallback(() => {
    handleChangeIsCreateDialogOpen(true);
  }, [handleChangeIsCreateDialogOpen]);

  const menuList = useMemo(
    () => [
      {
        id: "create",
        label: "Create New Project",
        Icon: AddIcon,
        onClick: handleCreate,
      },
      {
        id: "import",
        label: "Import New Project",
        Icon: ImportIcon,
        onClick: () => {},
      },
    ],
    [handleCreate]
  );

  return (
    <ButtonGroup className="divide-y" orientation={"vertical"}>
      {menuList.map(({ id, label, Icon, onClick }) => (
        <Button key={id} variant={"secondary"} size={"sm"} onClick={onClick}>
          <Icon /> {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ActionButtons;
