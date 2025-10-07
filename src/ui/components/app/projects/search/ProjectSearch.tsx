import { useCallback, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { X as CloseIcon } from "lucide-react";
import { useAppSelector } from "@/context/redux/hooks";
import { useProject } from "@/context/project/ProjectProvider";
import { selectProjectList } from "@/context/redux/request-response/selectors/project";

const ProjectSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSearchProjects } = useProject();
  const projectListFromStore = useAppSelector(selectProjectList);

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

  if (!projectListFromStore?.length) return null;

  return (
    <div className="w-full flex items-center gap-2 px-2 py-1 border-2 border-muted focus-within:border-primary/50 duration-75 transition-colors rounded-md min-h-10 my-1">
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
