import { memo, type FormEvent } from "react";
import { Search as SearchIcon, X as ClearIcon } from "lucide-react";
import { useEnvironments } from "@/context/environments/EnvironmentsProvider";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectEnvironmentsList } from "@/context/redux/request-response/selectors/environment";

const EnvironmentSearch = memo(() => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const { searchQuery, handleChangeSearchQuery } = useEnvironments();
  const showSearch = useAppSelector((state) =>
    Boolean(Object.keys(selectEnvironmentsList(state) ?? {}).length)
  );

  return (
    <AnimatePresence>
      {showSearch && (
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-64 flex items-center gap-1.5 border rounded-md px-2 py-1 focus-within:border-primary transition-all duration-75"
          initial={{
            opacity: 0,
          }}
          exit={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            ease: "anticipate",
          }}
        >
          <SearchLabelIcon />
          <input
            type="text"
            id="search-env-variable"
            value={searchQuery}
            onChange={(e) => handleChangeSearchQuery(e.target.value)}
            className="w-full border-none outline-none text-sm text-muted-foreground p-0.5"
            placeholder="Filter variables"
          />
          {searchQuery && (
            <SearchClearIcon onClick={() => handleChangeSearchQuery("")} />
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
});

const SearchLabelIcon = memo(() => (
  <label htmlFor="search-env-variable">
    <Button
      size={"iconXs"}
      className="rounded-full pointer-events-none"
      variant={"ghost"}
    >
      <SearchIcon size={16} />
    </Button>
  </label>
));

interface SearchClearIconProps {
  onClick?: () => void;
}

const SearchClearIcon = memo(({ onClick }: SearchClearIconProps) => (
  <Button
    size={"iconXs"}
    className="rounded-full"
    variant={"ghost"}
    onClick={onClick}
  >
    <ClearIcon size={16} />
  </Button>
));

export default EnvironmentSearch;
