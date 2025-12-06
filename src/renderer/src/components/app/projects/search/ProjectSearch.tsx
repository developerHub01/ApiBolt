import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { X as CloseIcon } from "lucide-react";
import { useAppSelector } from "@/context/redux/hooks";
import { useProject } from "@/context/project/ProjectProvider";
import { selectProjectList } from "@/context/redux/project/selectors/project";
import { Badge } from "@/components/ui/badge";

const DEBOUNCE_DELAY = 300;

const ProjectSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { projectList, handleSearchProjects } = useProject();
  const projectListFromStore = useAppSelector(selectProjectList);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        handleSearchProjects(value);
      }, DEBOUNCE_DELAY);
    },
    [handleSearchProjects],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      handleSearch(e.target.value.trim());
    },
    [handleSearch],
  );

  const handleClear = useCallback(() => {
    setSearchTerm("");
    handleSearchProjects("");
  }, [handleSearchProjects]);
  const totalProjectsCnt = projectListFromStore?.length;
  const searchResultProjectsCnt = projectList.length;

  if (!totalProjectsCnt) return null;

  return (
    <div className="flex gap-2 py-1 my-1">
      <div className="flex-1 flex items-center gap-2 px-2  border-2 border-border/50 focus-within:border-border duration-75 transition-colors rounded-md min-h-10">
        <input
          placeholder="Search projects..."
          className="flex-1 outline-none border-none text-sm"
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
      <Badge
        variant={"outline"}
        className="text-xs text-accent-foreground tracking-wider min-w-10"
      >
        {searchResultProjectsCnt !== totalProjectsCnt
          ? `${searchResultProjectsCnt}/`
          : ``}
        {totalProjectsCnt}
      </Badge>
    </div>
  );
};

export default ProjectSearch;
