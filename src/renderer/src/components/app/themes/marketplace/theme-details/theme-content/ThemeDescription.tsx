import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import ThemeDetailsSectionWrapper from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeDetailsSectionWrapper";

const ThemeDescription = () => {
  const themeDetails = useAppSelector(selectSelectedThemeDetails);
  if (!themeDetails || !themeDetails.description) return null;

  return (
    <ThemeDetailsSectionWrapper title="Description:">
      <p className="text-sm leading-relaxed text-accent-foreground">
        {themeDetails.description}
      </p>
    </ThemeDetailsSectionWrapper>
  );
};

export default ThemeDescription;
