import Splash from "@/app-splash/Splash";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/context/redux/store-provider";

const App = () => {
  return (
    <StoreProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Splash />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
