import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
