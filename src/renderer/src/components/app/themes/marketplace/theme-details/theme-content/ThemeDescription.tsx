import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";

const ThemeDescription = () => {
  const themeDetails = useAppSelector(selectSelectedThemeDetails);
  if (!themeDetails || !themeDetails.description) return null;

  return (
    <p className="text-sm leading-relaxed text-accent-foreground">
      {themeDetails.description}
    </p>
  );
};

export default ThemeDescription;
