import Router from "@/route";
import PreventDefaultActions from "@/components/prevent-default-actions";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
      <PreventDefaultActions />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
