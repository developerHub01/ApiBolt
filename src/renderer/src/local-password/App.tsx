import Splash from "@/local-password/Splash";
import StoreProvider from "@/context/redux/store-provider";

const App = () => {
  return (
    <StoreProvider>
      <Splash />
    </StoreProvider>
  );
};

export default App;
