import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeCard from "@/components/app/themes/marketplace/[id]/theme-list/ThemeCard";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectIsThemeMarketplaceSelectedThemeId } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSelectedThemeId } from "@/context/redux/theme-marketplace/theme-marketplace-slice";

const ThemeList = () => {
  const dispatch = useAppDispatch();
  const selectedThemeId = useAppSelector(
    selectIsThemeMarketplaceSelectedThemeId,
  );

  return (
    <ScrollArea className="flex-1 w-full min-h-0">
      <section className="grid grid-cols-2 gap-3 p-1">
        {Array.from({ length: 10 }, (_, key) => (
          <ThemeCard
            key={key}
            id={String(key)}
            isSelected={selectedThemeId === String(key)}
            onClick={() => dispatch(handleChangeSelectedThemeId(String(key)))}
          />
        ))}
      </section>
    </ScrollArea>
  );
};

export default ThemeList;
