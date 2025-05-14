import type { FormEvent } from "react";
import { Search as SearchIcon } from "lucide-react";

const EnvironmentSearch = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-64 flex items-center gap-1.5 border rounded-md px-2 py-1 focus-within:border-primary transition-all duration-75"
    >
      <label htmlFor="search-env-variable">
        <SearchIcon size={16} />
      </label>
      <input
        type="text"
        id="search-env-variable"
        className="w-full border-none outline-none text-sm text-muted-foreground"
        placeholder="Filter variables"
      />
    </form>
  );
};

export default EnvironmentSearch;
