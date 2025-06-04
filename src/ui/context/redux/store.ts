import { configureStore } from "@reduxjs/toolkit";
import requestListReducer from "@/context/redux/request-list-slice/request-list-slice";
import tabSidebarReducer from "@/context/redux/tab-sidebar-slice/tab-sidebar-slice";
import requestResponseReducer from "@/context/redux/request-response/request-response-slice";

export const store = configureStore({
  reducer: {
    requestList: requestListReducer,
    tabSidebar: tabSidebarReducer,
    requestResponse: requestResponseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
