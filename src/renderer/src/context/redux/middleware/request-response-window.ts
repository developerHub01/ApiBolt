import { MiddlewareAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/context/redux/store";
import { handleAddRequestTimeLine } from "@/context/redux/request-response-window/request-response-window-slice";
import { keepOnlyWindowedRequests } from "@/context/redux/request-response/thunks/basic";

export const requestResponseWindowMiddleware = store => next => action => {
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  handleRequestResponseWindowBound({
    store,
    prevState,
    nextState,
  });

  return result;
};

// Properly type MiddlewareAPI so dispatch works with thunks
const handleRequestResponseWindowBound = ({
  store,
  prevState,
  nextState,
}: {
  store: MiddlewareAPI<AppDispatch, RootState>;
  prevState: RootState;
  nextState: RootState;
}) => {
  const prevTab = prevState.requestResponse.selectedTab;
  const nextTab = nextState.requestResponse.selectedTab;

  if (prevTab === nextTab || !nextTab) return;

  // Add to timeline
  store.dispatch(handleAddRequestTimeLine(nextTab));

  // Keep only windowed requests (async thunk)
  store.dispatch(keepOnlyWindowedRequests());
};
