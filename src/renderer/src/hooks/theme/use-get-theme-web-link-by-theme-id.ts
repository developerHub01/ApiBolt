import { useMemo } from "react";
import { DEFAULT_THEME_ID } from "@shared/constant/theme";

const useGetThemeWebLinkByThemeId = (id: string | null | string) => {
  return useMemo(
    () =>
      id && typeof id === "string" && id !== DEFAULT_THEME_ID
        ? `${import.meta.env.VITE_WEBSITE_BASE_URL}/theme/${id}`
        : null,
    [id],
  );
};

export default useGetThemeWebLinkByThemeId;
