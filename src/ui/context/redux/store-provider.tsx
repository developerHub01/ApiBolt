import type React from "react";
import { Provider } from "react-redux";
import { store } from "@/context/redux/store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
