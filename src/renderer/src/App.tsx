import Router from "@/route";
import PreventDefaultActions from "@/components/prevent-default-actions";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/context/redux/store-provider";

const App = () => {
  return (
    <StoreProvider>
      <Router />
      <PreventDefaultActions />
      <Toaster />
    </StoreProvider>
  );
};

export default App;
