import { useMemo } from "react";
import { DEFAULT_THEME_ID } from "@shared/constant/theme";
import { WEBSITE_BASE_URL } from "@shared/constant/api-bolt";

const useGetThemeWebLinkByThemeId = (id: string | null | string) => {
  return useMemo(
    () =>
      id && typeof id === "string" && id !== DEFAULT_THEME_ID
        ? `${WEBSITE_BASE_URL}/theme/${id}`
        : null,
    [id],
  );
};

export default useGetThemeWebLinkByThemeId;
