import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
      "useEnvironments must be used within an EnvironmentsProvider."
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
      env.variable?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
};

const DEBOUNCE_DELAY = 300;

interface EnvironmentsProviderProps {
  children: React.ReactNode;
}

const EnvironmentsProvider = ({ children }: EnvironmentsProviderProps) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const environmentsListFromStore = useAppSelector(
    (state) => state.environments.environmentsList ?? {}
  );

  const [environmentsListState, setEnvironmentsListState] = useState<
    Record<string, EnvironmentInterface>
  >({});
  const [searchQuery, setSearchQuery] = useState("");

  /* Update the list whenever the main list or search query changes */
  const updateFilteredEnvironments = useCallback(
    (query: string) => {
      setEnvironmentsListState(
        searchFilteredEnvironments({
          searchQuery: query,
          environmentsList: environmentsListFromStore,
        })
      );
    },
    [environmentsListFromStore]
  );

  /* Debounced search */
  const handleSearch = useCallback(
    (value: string) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        updateFilteredEnvironments(value);
      }, DEBOUNCE_DELAY);
    },
    [updateFilteredEnvironments]
  );

  /* Handle input change */
  const handleChangeSearchQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);
      handleSearch(value);
    },
    [handleSearch]
  );

  /* Initialize environments list on mount and whenever the store updates */
  useEffect(() => {
    updateFilteredEnvironments(searchQuery);
  }, [environmentsListFromStore, searchQuery, updateFilteredEnvironments]);

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
