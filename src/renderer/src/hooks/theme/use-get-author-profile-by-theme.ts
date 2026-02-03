import { useMemo } from "react";
import { ThemeInterface } from "@shared/types/theme.types";
import { WEBSITE_BASE_URL } from "@shared/constant/api-bolt";

const useGetAuthorProfileByTheme = (theme: ThemeInterface | null | string) => {
  return useMemo(
    () =>
      typeof theme === "string"
        ? `${WEBSITE_BASE_URL}/profile/${theme}`
        : theme?.authorUsername
          ? `${WEBSITE_BASE_URL}/profile/${theme?.authorUsername}`
          : null,
    [theme],
  );
};

export default useGetAuthorProfileByTheme;
