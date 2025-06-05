import { configureStore } from "@reduxjs/toolkit";
import requestResponseReducer from "@/context/redux/request-response/request-response-slice";
import sidebarReducer from "@/context/redux/sidebar/sidebar-slice";

export const store = configureStore({
  reducer: {
    requestResponse: requestResponseReducer,
    sidebar: sidebarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
