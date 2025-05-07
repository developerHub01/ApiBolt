import Router from "@/Route";
import PreventDefaultActions from "@/components/prevent-default-actions";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <>
      <Router />
      <PreventDefaultActions />
      <Toaster />
    </>
  );
};

export default App;
