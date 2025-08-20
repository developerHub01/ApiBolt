import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadEnvironmentsList } from "@/context/redux/request-response/thunks/environment";
import type { EnvironmentInterface } from "@/types/request-response.types";

interface EnvironmentsContext {
  environmentsListState: Record<string, EnvironmentInterface>;
  searchQuery: string;
  handleChangeSearchQuery: (value: string) => void;
}

const EnvironmentsContext = createContext<EnvironmentsContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useEnvironments = () => {
  const context = useContext(EnvironmentsContext);

  if (!context) {
    throw new Error(
      "useEnvironments must be used within a EnvironmentsProvider."
    );
  }

  return context;
};

const searchFilteredEnvironments = ({
  searchQuery,
  environmentsList,
}: {
  searchQuery: string;
  environmentsList: Record<string, EnvironmentInterface>;
}) => {
  if (!searchQuery) {
    return environmentsList;
  } else {
    return Object.fromEntries(
      Object.entries(environmentsList).filter(([, env]) =>
        env.variable?.toLowerCase()?.includes(searchQuery.toLowerCase())
      )
    );
  }
};

interface EnvironmentsProviderProps {
  children: React.ReactNode;
}

const EnvironmentsProvider = ({ children }: EnvironmentsProviderProps) => {
  const dispatch = useAppDispatch();
  const [environmentsListState, setEnvironmentsListState] = useState<
    Record<string, EnvironmentInterface>
  >({});
  const environmentsList = useAppSelector(
    (state) => state.requestResponse.environmentsList ?? {}
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    (async () => {
      const list = await dispatch(loadEnvironmentsList()).unwrap();
      setEnvironmentsListState(list);
    })();
  }, [dispatch]);

  useEffect(() => {
    setEnvironmentsListState(
      searchFilteredEnvironments({ searchQuery, environmentsList })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environmentsList]);

  const handleChangeSearch = useCallback(
    (value: string) => {
      setEnvironmentsListState(
        searchFilteredEnvironments({
          searchQuery: value,
          environmentsList,
        })
      );
    },
    [environmentsList]
  );

  const handleChangeSearchQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);

      handleChangeSearch(value);
    },
    [handleChangeSearch]
  );

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
