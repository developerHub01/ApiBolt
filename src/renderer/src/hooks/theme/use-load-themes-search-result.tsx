import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadThemesSearchResult } from "@/context/redux/theme-marketplace/thunks/theme-marketplace";
import {
  selectThemeMarketplaceSearchFilter,
  selectThemeMarketplaceSearchPage,
  selectThemeMarketplaceSearchTerm,
} from "@/context/redux/theme-marketplace/selectors/theme-marketplace";

const useLoadThemesSearchResult = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectThemeMarketplaceSearchTerm);
  const searchFilter = useAppSelector(selectThemeMarketplaceSearchFilter);
  const searchPage = useAppSelector(selectThemeMarketplaceSearchPage);

  useEffect(() => {
    dispatch(loadThemesSearchResult());
  }, [dispatch, searchTerm, searchFilter, searchPage]);
};

export default useLoadThemesSearchResult;
