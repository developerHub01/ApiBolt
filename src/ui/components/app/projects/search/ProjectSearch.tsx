import { useCallback, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { X as CloseIcon } from "lucide-react";
import { useProjectMenu } from "@/context/project/ProjectMenuProvider";

const ProjectSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { projectList, handleSearchProjects } = useProjectMenu();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      handleSearchProjects(e.target.value);
    },
    [handleSearchProjects]
  );

  const handleClear = useCallback(() => {
    setSearchTerm("");
    handleSearchProjects("");
  }, [handleSearchProjects]);

  if (!projectList?.length) return null;

  return (
    <div className="w-full flex items-center gap-2 px-2 py-1 border border-muted rounded-md ring-0 focus-within:ring-1 ring-primary min-h-10 my-1">
      <input
        placeholder="Search Project"
        className="w-full outline-none border-none"
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <Button
          size="iconXs"
          className="rounded-full"
          variant={"ghost"}
          onClick={handleClear}
        >
          <CloseIcon size={12} />
        </Button>
      )}
    </div>
  );
};

export default ProjectSearch;
