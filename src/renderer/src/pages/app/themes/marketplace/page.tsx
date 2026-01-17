import ThemeListTop from "@/components/app/themes/marketplace/theme-list/theme-list-top/ThemeListTop";
import ThemeList from "@/components/app/themes/marketplace/theme-list/ThemeList";
import ThemeDetails from "@/components/app/themes/marketplace/theme-details/ThemeDetails";
import MarketplacePagination from "@/components/app/themes/marketplace/theme-list/MarketplacePagination";
import useLoadThemesSearchResult from "@/hooks/theme/use-load-themes-search-result";
import ThemeInstallMaxSizeAlert from "@/components/app/themes/marketplace/ThemeInstallMaxSizeAlert";

const ThemeMarketPlacePage = () => {
  useLoadThemesSearchResult();

  return (
    <section className="w-full min-h-0 max-w-3xl flex-1 flex flex-col p-5 mx-auto gap-4">
      <ThemeListTop />
      <ThemeList />
      <ThemeDetails />
      <MarketplacePagination />
      <ThemeInstallMaxSizeAlert />
    </section>
  );
};

export default ThemeMarketPlacePage;
