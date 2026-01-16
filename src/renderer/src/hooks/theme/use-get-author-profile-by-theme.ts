import { useMemo } from "react";
import { ThemeInterface } from "@shared/types/theme.types";

const useGetAuthorProfileByTheme = (theme: ThemeInterface | null | string) => {
  return useMemo(
    () =>
      typeof theme === "string"
        ? `${import.meta.env.VITE_WEBSITE_BASE_URL}/profile/${theme}`
        : theme?.authorUsername
          ? `${import.meta.env.VITE_WEBSITE_BASE_URL}/profile/${theme?.authorUsername}`
          : null,
    [theme],
  );
};

export default useGetAuthorProfileByTheme;
