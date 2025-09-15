import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/context/redux/store";
import type { ParamInterface } from "@/types/request-response.types";

export const selectParams = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  ],
  (params): Array<ParamInterface> => (!params ? [] : params)
);

export const selectCheckedParams = createSelector(
  [
    (state: RootState) =>
      state.requestResponse.params[state.requestResponse.selectedTab ?? ""],
  ],
  (params): Array<ParamInterface> =>
    (!params ? [] : params).filter((param) => param.isCheck)
);
