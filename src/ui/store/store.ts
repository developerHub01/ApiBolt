import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createRequestListSlice,
  type RequestListSliceInterface,
} from "@/store/request-list-slice";
import { immer } from "zustand/middleware/immer";

export type TStore = RequestListSliceInterface;

export const useStore = create<TStore>()(
  devtools(
    immer((...args) => ({
      ...createRequestListSlice(...args),
    })),
    { name: "ApiBoltStore" }
  )
);
