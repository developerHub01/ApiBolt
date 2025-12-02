import Splash from "@/app-splash/Splash";
import StoreProvider from "@/context/redux/store-provider";

const App = () => {
  return (
    <StoreProvider>
      <Splash />
    </StoreProvider>
  );
};

export default App;
