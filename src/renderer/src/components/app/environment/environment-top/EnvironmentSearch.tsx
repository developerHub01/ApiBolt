import { memo } from "react";
import { useEnvironments } from "@/context/environments/EnvironmentsProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectEnvironmentsList } from "@/context/redux/environments/selectors/environments";
import Searchbar from "@/components/ui/searchbar";

const EnvironmentSearch = memo(() => {
  const { searchQuery, handleChangeSearchQuery } = useEnvironments();
  const showSearch = useAppSelector(state =>
    Boolean(Object.keys(selectEnvironmentsList(state) ?? {}).length),
  );

  if (!showSearch) return null;
  return (
    <Searchbar
      value={searchQuery}
      onChange={handleChangeSearchQuery}
      placeholder="Filter variables"
    />
  );
});

export default EnvironmentSearch;
