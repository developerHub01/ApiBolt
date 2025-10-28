import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "@/context/redux/project/project-slice";
import keyboardShortcutsReducer from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import requestResponseReducer from "@/context/redux/request-response/request-response-slice";
import sidebarReducer from "@/context/redux/sidebar/sidebar-slice";
import headerReducer from "@/context/redux/header/header-slice";
import settingReducer from "@/context/redux/setting/setting-slice";
import cookiesReducer from "@/context/redux/cookies/cookies-slice";
import requestUrlReducer from "@/context/redux/request-url/request-url-slice";
import httpStatusReducer from "@/context/redux/http-status/http-status-slice";
import statusReducer from "@/context/redux/status/status-slice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    keyboardShortcuts: keyboardShortcutsReducer,
    requestResponse: requestResponseReducer,
    sidebar: sidebarReducer,
    header: headerReducer,
    setting: settingReducer,
    cookies: cookiesReducer,
    requestUrl: requestUrlReducer,
    httpStatus: httpStatusReducer,
    status: statusReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
