import ThemeListTop from "@/components/app/themes/marketplace/[id]/theme-list/theme-list-top/ThemeListTop";
import ThemeList from "@/components/app/themes/marketplace/[id]/theme-list/ThemeList";
import ThemeDetails from "@/components/app/themes/marketplace/[id]/theme-details/ThemeDetails";
import MarketplacePagination from "@/components/app/themes/marketplace/MarketplacePagination";
import useLoadThemesSearchResult from "@/hooks/theme/use-load-themes-search-result";

const ThemeMarketPlacePage = () => {
  useLoadThemesSearchResult();

  return (
    <section className="w-full min-h-0 max-w-3xl flex-1 flex flex-col p-5 mx-auto gap-4">
      <ThemeListTop />
      <ThemeList />
      <ThemeDetails />
      <MarketplacePagination />
    </section>
  );
};

export default ThemeMarketPlacePage;
