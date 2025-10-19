import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import { DEFAULT_COOKIE_DETAILS } from "@/context/redux/cookies/cookies-slice";
import type { CookieInterface } from "@/types/cookies.types";

export const selectIsCookiesOpen = createSelector(
  [(state: RootState) => state.cookies.isCookiesOpen],
  (isCookiesOpen) => isCookiesOpen ?? false
);

export const selectCookies = createSelector(
  [(state: RootState) => state.cookies.cookies],
  (cookies) => cookies ?? []
);

export const selectCookiesCount = createSelector(
  [(state: RootState) => state.cookies.cookies.length],
  (cookiesCount) => cookiesCount ?? 0
);

export const selectCookiesIsLoading = createSelector(
  [(state: RootState) => state.cookies.isLoading],
  (isLoading) => isLoading
);

export const selectCookiesError = createSelector(
  [(state: RootState) => state.cookies.error],
  (error) => error
);

export const selectSelectedCookieKey = createSelector(
  [(state: RootState) => state.cookies.selectedCookieKey],
  (selectedCookieKey) => selectedCookieKey
);

export const selectSelectedCookie = createSelector(
  [
    (state: RootState) => state.cookies.cookies,
    (state: RootState) => state.cookies.selectedCookieKey,
  ],
  (cookies, selectedCookieKey) =>
    cookies.find((cookie) => cookie.key === selectedCookieKey) ?? null
);

export const selectIsAddOptionOpen = createSelector(
  [(state: RootState) => state.cookies.isAddOptionOpen],
  (isAddOptionOpen) => isAddOptionOpen
);

export const selectAddCookieDetails = createSelector(
  [(state: RootState) => state.cookies.addCookieDetails],
  (addCookieDetails) => addCookieDetails
);

export const selectAddCookieEnabled = createSelector(
  [(state: RootState) => state.cookies.addCookieDetails],
  (addCookieDetails) =>
    Boolean(addCookieDetails.key && addCookieDetails.value && addCookieDetails)
);

export const selectAddCookieHaveChanges = createSelector(
  [(state: RootState) => state.cookies.addCookieDetails],
  (addCookieDetails) =>
    Object.keys(addCookieDetails).some(
      (entry) =>
        addCookieDetails[entry as keyof typeof addCookieDetails] !==
        DEFAULT_COOKIE_DETAILS[entry as keyof typeof addCookieDetails]
    )
);

export const selectUpdateCookieHaveChanges = createSelector(
  [
    (state: RootState) => state.cookies.cookies,
    (state: RootState) => state.cookies.editingCookies,
    (state: RootState) => state.cookies.selectedCookieKey,
  ],
  (cookies, editingCookies, selectedCookieKey) => {
    const targetCookie = cookies.find(
      (entry) => entry.key === selectedCookieKey
    );

    if (
      !selectedCookieKey ||
      !targetCookie ||
      !editingCookies[selectedCookieKey]
    )
      return false;

    return Object.keys(editingCookies[selectedCookieKey]).some(
      (entry) =>
        (editingCookies[selectedCookieKey] as CookieInterface)[
          entry as keyof CookieInterface
        ] !== targetCookie[entry as keyof CookieInterface]
    );
  }
);

export const selectIsCookieEditing = createSelector(
  [
    (state: RootState) =>
      state.cookies.isEditing[state.cookies.selectedCookieKey ?? ""],
  ],
  (isEditing) => Boolean(isEditing)
);
