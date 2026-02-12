import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "@/context/redux/hooks";
import type { EnvironmentInterface } from "@shared/types/environment.types";

interface EnvironmentsContextType {
  environmentsListState: Record<string, EnvironmentInterface>;
  searchQuery: string;
  handleChangeSearchQuery: (value: string) => void;
}

const EnvironmentsContext = createContext<EnvironmentsContextType | null>(null);

/* Hook to use environments context */
export const useEnvironments = () => {
  const context = useContext(EnvironmentsContext);
  if (!context) {
    throw new Error(
      "useEnvironments must be used within an EnvironmentsProvider.",
    );
  }
  return context;
};

/* Utility function to filter environments */
const searchFilteredEnvironments = ({
  searchQuery,
  environmentsList,
}: {
  searchQuery: string;
  environmentsList: Record<string, EnvironmentInterface>;
}) => {
  if (!searchQuery) return environmentsList;

  return Object.fromEntries(
    Object.entries(environmentsList).filter(([, env]) =>
      env.variable?.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );
};

const DEBOUNCE_DELAY = 300;

interface EnvironmentsProviderProps {
  children: React.ReactNode;
}

const EnvironmentsProvider = ({ children }: EnvironmentsProviderProps) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const environmentsListFromStore = useAppSelector(
    state => state.environments.environmentsList ?? {},
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const environmentsListState = useMemo(
    () =>
      searchFilteredEnvironments({
        searchQuery: debouncedQuery,
        environmentsList: environmentsListFromStore,
      }),
    [debouncedQuery, environmentsListFromStore],
  );

  /* Debounced search */
  const handleSearch = useCallback((value: string) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(
      () => setDebouncedQuery(value),
      DEBOUNCE_DELAY,
    );
  }, []);

  /* Handle input change */
  const handleChangeSearchQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);

      if (!value) {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        setDebouncedQuery("");
        return;
      }

      handleSearch(value);
    },
    [handleSearch],
  );

  /* Clean up debounce on unmount */
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  return (
    <EnvironmentsContext.Provider
      value={{
        environmentsListState,
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </EnvironmentsContext.Provider>
  );
};

export default EnvironmentsProvider;
