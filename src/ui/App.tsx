import Router from "@/route";
import PreventDefaultActions from "@/components/prevent-default-actions";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/context/redux/store-provider";

const App = () => {
  return (
    <StoreProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router />
        <PreventDefaultActions />
        <Toaster />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
